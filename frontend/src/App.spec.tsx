import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import {ListItem} from "./services/list-item-services";
import List from "./containers/List/List";

const mockItemArray: ListItem[] = [
  {
    id: 1,
    title: "Title1",
    createdAt: new Date(),
    content: "Content1",
    category: "Cate1",
    urgency: "low",
    isDone: false,
  },
  {
    id: 2,
    title: "Title2",
    createdAt: new Date(),
    content: "Content2",
    category: "Cate2",
    urgency: "medium",
    isDone: false,
  },
  {
    id: 3,
    title: "Title3",
    createdAt: new Date(),
    content: "Content3",
    category: "Cats",
    urgency: "high",
    isDone: false,
  },
  {
    id: 4,
    title: "Title4",
    createdAt: new Date(),
    content: "Content4",
    category: "Cate4",
    urgency: "high",
    isDone: true,
  },
];

const renderList = (items: ListItem[]) => {
  const fetchData = jest.fn();
  return <List items={items} fetchData={fetchData} />;
};

describe("App", () => {
  test("renders addBtn and opens modal", async () => {
    render(<App />);

    const user = userEvent.setup();

    const addBtn = screen.getByTestId("addBtn");
    expect(addBtn).toBeInTheDocument();
    await user.click(addBtn);
    const modalBtn = screen.getByTestId("modalBtn");
    expect(modalBtn).toBeInTheDocument();
  });

  test("renders and maps list items", async () => {
    render(renderList(mockItemArray));

    const listItems = screen.getAllByTestId("listItem");
    expect(listItems).toHaveLength(4);
  });

  test("renders list items with the correct data", async () => {
    render(renderList(mockItemArray));

    const listItems = screen.getAllByTestId("listItem");

    const item1 = listItems[0];
    expect(item1).toHaveTextContent("Title1");
    expect(item1).toHaveTextContent("Content1");
    expect(item1).toHaveTextContent("Cate1");
    expect(item1).toHaveTextContent("Created");
    expect(item1).not.toHaveTextContent("Completed!");

    const item2 = listItems[1];
    expect(item2).toHaveTextContent("Title2");
    expect(item2).toHaveTextContent("Content2");
    expect(item2).toHaveTextContent("Cate2");
    expect(item2).toHaveTextContent("Created");
    expect(item2).not.toHaveTextContent("Completed!");

    const item3 = listItems[2];
    expect(item3).toHaveTextContent("Title3");
    expect(item3).toHaveTextContent("Content3");
    expect(item3).toHaveTextContent("Cats");
    expect(item3).toHaveTextContent("Created");
    expect(item3).not.toHaveTextContent("Completed!");

    const item4 = listItems[3];
    expect(item4).toHaveTextContent("Title4");
    expect(item4).toHaveTextContent("Content4");
    expect(item4).toHaveTextContent("Cate4");
    expect(item4).not.toHaveTextContent("Created");
    expect(item4).toHaveTextContent("Completed!");
  });

  test("renders edit/delete/complete buttons", async () => {
    render(renderList(mockItemArray));

    const editBtn = screen.getAllByTestId("editBtn");
    expect(editBtn).toHaveLength(3);
    const deleteBtn = screen.getAllByTestId("deleteBtn");
    expect(deleteBtn).toHaveLength(4);
    const completeBtn = screen.getAllByTestId("completeBtn");
    expect(completeBtn).toHaveLength(3);
  });

  test("Edit button opens modal", async () => {
    render(renderList(mockItemArray));

    const user = userEvent.setup();

    const editBtn = screen.getAllByTestId("editBtn");
    await user.click(editBtn[0]);
    const modalBtn = screen.getByTestId("modalBtn");
    expect(modalBtn).toBeInTheDocument();
  });
});
