import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ListItem {
  id: number;
  title: string;
  createdAt: Date;
  content: string;
  category: string;
  urgency: string;
  isDone: boolean;
}

const successNotification = (message: String, statusCode: number) =>
  toast.success(`${message} Status Code: ${statusCode}`);
const failureNotification = (message: String, statusCode: number) =>
  toast.error(`${message} Status Code: ${statusCode}`);

export const getAllListItems = async () => {
  const response = await fetch("http://localhost:8080/items");
  if (!response.ok) {
    failureNotification("Error fetching list items", response.status);
  }
  const data = await response.json();
  return data;
};

export const createListItem = async (listItem: ListItem) => {
  const response = await fetch("http://localhost:8080/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listItem),
  });
  if (!response.ok) {
    failureNotification("Error creating list item", response.status);
  } else {
    successNotification("Item created", response.status);
  }
  const data = await response.json();
  return data;
};

export const getListItemById = async (id: number) => {
  const response = await fetch(`http://localhost:8080/items/${id}`);
  if (!response.ok) {
    failureNotification("Error fetching list item", response.status);
  }
  const data = await response.json();
  return data;
};

export const patchListItem = async (id: number, listItem: ListItem) => {
  const updatedListItem = {
    ...listItem,
    isDone: false,
  };
  const response = await fetch(`http://localhost:8080/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedListItem),
  });
  if (!response.ok) {
    failureNotification("Error updating list item", response.status);
  } else {
    successNotification("Item updated", response.status);
  }
  const data = await response.json();
  return data;
};

export const completeListItem = async (id: number, listItem: ListItem) => {
  const updatedListItem = {
    ...listItem,
    isDone: true,
  };
  const response = await fetch(`http://localhost:8080/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedListItem),
  });
  if (!response.ok) {
    failureNotification("Error completing list item", response.status);
  } else {
    successNotification("Great Job!", response.status);
  }
  const data = await response.json();
  return data;
};

export const deleteListItemById = async (id: number) => {
  const response = await fetch(`http://localhost:8080/items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    failureNotification("Error deleting list item", response.status);
  } else {
    successNotification("Item deleted", response.status);
  }
  // Don't try to parse the response body if it's empty
  if (response.status === 204 || response.statusText === "No Content") {
    return null;
  }
  const data = await response.json();
  return data;
};
