import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import cross from '../images/icon-cross.svg'
import check from '../images/icon-check.svg'
import "../App.css";
import "./Todos.css";

const Todos = ({ theme, desktopWidth,widthGenCont }) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [numberItems, setNumberitems] = useState(0);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("todos").onSnapshot(
      (snapshot) => {
        setNumberitems(snapshot.size);
        if (snapshot.empty) {
          setError("No todos to show,start by adding some new recipes");
          setIsPending(false);
        } else {
          const results = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setData(results);
          setFilteredData(results.filter((todo) => true));
          setIsPending(false);
        }
      },
      (e) => {
        setError(e);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, [setData, setError, setIsPending]);

  const handleDelete = (id) => {
    projectFirestore.collection("todos").doc(id).delete();
  };

  const handleClearCompleted = () => {
    data.forEach((todo) => {
      if (todo.done) {
        projectFirestore.collection("todos").doc(todo.id).delete();
      }
    });
  };

  const handleDone = (todo) => {
    console.log(todo);
    !todo.done
      ? projectFirestore.collection("todos").doc(todo.id).update({ done: true })
      : projectFirestore
          .collection("todos")
          .doc(todo.id)
          .update({ done: false });
  };

  const [filter, setFilter] = useState("all");
  const onClickActiveFilter = () => {
    setFilter("active");
    setFilteredData(data.filter((todo) => !todo.done));
  };
  const onClickAllFilter = () => {
    setFilter("all");
    setFilteredData(data.filter((todo) => true));
  };
  const onClickCompletedFilter = () => {
    setFilter("completed");
    setFilteredData(data.filter((todo) => todo.done));
  };
  return (
    <div className="Todos">
      <ul className="list-group">
        {error && <h2 style={{ textAlign: "center" }}>{error}</h2>}
        {isPending && <h2>Loading...</h2>}
        {filteredData &&
          filteredData.map((todo) => {
            return (
              <li
                className="list-group-item item"
                key={todo.id}
                style={
                  theme === "dark" && window.innerWidth > desktopWidth
                    ? {
                        backgroundColor: "hsl(235, 24%, 19%)",
                        color: "hsl(234, 39%, 85%)",
                        width: widthGenCont,
                      }
                    : theme === "light" && window.innerWidth > desktopWidth
                    ? { width: widthGenCont }
                    : theme === "dark"
                    ? {
                        backgroundColor: "hsl(235, 24%, 19%)",
                        color: "hsl(234, 39%, 85%)",
                      }
                    : {}
                }
              >
                <div
                  className="circleActivate"
                  style={
                    todo.done && theme === "light"
                      ? {
                          margin: "0",
                          marginRight: "10px",
                          backgroundImage:
                            "linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))",
                        }
                      : todo.done && theme === "dark"
                      ? {
                          margin: "0",
                          marginRight: "10px",
                          backgroundImage:
                            "linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))",
                          border: "1.5px solid hsl(233, 14%, 35%)",
                        }
                      : theme === "dark"
                      ? {
                          margin: "0",
                          marginRight: "10px",
                          border: "1.5px solid hsl(233, 14%, 35%)",
                        }
                      : { margin: "0", marginRight: "10px" }
                  }
                  onClick={() => {
                    handleDone(todo);
                  }}
                >
                  {todo.done && (
                    <img
                      src={check}
                      alt="done"
                      style={{ marginBottom: "5px", marginLeft: "5px" }}
                    />
                  )}
                </div>
                <p
                  style={
                    todo.done
                      ? { textDecoration: "line-through", opacity: "40%" }
                      : {}
                  }
                >
                  {todo.todo}
                </p>
                <img
                  src={cross}
                  alt="cross"
                  className="cross"
                  onClick={() => handleDelete(todo.id)}
                />
              </li>
            );
          })}
        <li
          className="list-group-item item itemSpecial"
          style={
            theme === "dark" && window.innerWidth > desktopWidth
              ? {
                  backgroundColor: "hsl(235, 24%, 19%)",
                  color: "hsl(234, 39%, 85%)",
                  width: widthGenCont,
                }
              : theme === "light" && window.innerWidth > desktopWidth
              ? { width: widthGenCont }
              : theme === "dark"
              ? {
                  backgroundColor: "hsl(235, 24%, 19%)",
                  color: "hsl(234, 39%, 85%)",
                }
              : {}
          }
        >
          <p>{numberItems} items left</p>
          <p className="clear" onClick={handleClearCompleted}>
            Clear Completed
          </p>
        </li>
      </ul>
      <ul className="list-group">
        <li
          className="list-group-item item filter"
          style={
            theme === "dark" && window.innerWidth > desktopWidth
              ? {
                  backgroundColor: "hsl(235, 24%, 19%)",
                  color: "hsl(234, 39%, 85%)",
                  width: widthGenCont,
                }
              : theme === "light" && window.innerWidth > desktopWidth
              ? { width: widthGenCont }
              : theme === "dark"
              ? {
                  backgroundColor: "hsl(235, 24%, 19%)",
                  color: "hsl(234, 39%, 85%)",
                }
              : {}
          }
        >
          <p
            onClick={() => onClickAllFilter()}
            style={
              filter === "all"
                ? { color: "hsl(220, 98%, 61%)", opacity: "100%" }
                : {}
            }
          >
            All
          </p>
          <p
            onClick={() => {
              onClickActiveFilter();
            }}
            style={
              filter === "active"
                ? { color: "hsl(220, 98%, 61%)", opacity: "100%" }
                : {}
            }
          >
            Active
          </p>
          <p
            onClick={() => onClickCompletedFilter()}
            style={
              filter === "completed"
                ? { color: "hsl(220, 98%, 61%)", opacity: "100%" }
                : {}
            }
          >
            Completed
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Todos;
