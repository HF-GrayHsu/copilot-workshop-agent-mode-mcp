const STORAGE_KEY = "copilot-workshop-todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const remainingCount = document.getElementById("remaining-count");

let todos = loadTodos();

// 讀取並檢查已儲存的資料，避免損壞的內容影響清單。
function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return [];
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      throw new TypeError("待辦清單資料格式不正確。");
    }

    const validTodos = parsed.filter(
      (todo) =>
        todo !== null &&
        typeof todo === "object" &&
        typeof todo.id === "string" &&
        typeof todo.text === "string" &&
        typeof todo.completed === "boolean"
    );

    if (validTodos.length !== parsed.length) {
      console.warn("待辦清單包含格式不正確的項目，已略過無效資料。");
    }

    return validTodos;
  } catch (error) {
    console.error("無法讀取待辦清單；本次將以空清單開始。", error);
    return [];
  }
}

// 先成功儲存，再更新畫面狀態，避免儲存失敗時顯示未保存的變更。
function updateTodos(nextTodos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTodos));
  todos = nextTodos;
  render();
}

// 依照目前資料重新繪製清單與未完成數量。
function render() {
  const fragment = document.createDocumentFragment();

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = todo.completed ? "todo-item completed" : "todo-item";
    item.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為完成`);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-delete";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);

    item.append(checkbox, text, deleteButton);
    fragment.append(item);
  });

  list.replaceChildren(fragment);
  emptyState.hidden = todos.length > 0;

  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${remaining} 項`;
}

// 使用時間與隨機值組合，產生不重複的待辦事項識別碼。
function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text.length === 0) {
    input.focus();
    return;
  }

  updateTodos([...todos, { id: createId(), text, completed: false }]);
  form.reset();
  input.focus();
});

list.addEventListener("change", (event) => {
  if (!(event.target instanceof HTMLInputElement) || !event.target.matches(".todo-checkbox")) {
    return;
  }

  const item = event.target.closest(".todo-item");
  if (!item) {
    return;
  }

  const todoId = item.dataset.id;
  updateTodos(
    todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: event.target.checked } : todo
    )
  );
});

list.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLButtonElement) || !event.target.matches(".btn-delete")) {
    return;
  }

  const item = event.target.closest(".todo-item");
  if (!item) {
    return;
  }

  const todoId = item.dataset.id;
  updateTodos(todos.filter((todo) => todo.id !== todoId));
});

render();
