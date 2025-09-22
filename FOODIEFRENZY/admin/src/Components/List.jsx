import { useEffect, useState } from "react";
import { styles } from "../../public/dummyadmin";
import { FiHeart, FiStar, FiTrash } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/items");
        setItems(data);
        navigate("/list");
      } catch (error) {
        console.log("error--->", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // delete

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`http://localhost:4000/api/items/${itemId}`);
          setItems((prev) => prev.filter((item) => item._id !== itemId));
          console.log("Deleted item id", itemId);
          toast.success("Deleted Successful");
        } catch (error) {
          console.log("delete error", error);
        } finally {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const renderStar = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        className={`text-xl ${
          i < rating ? "text-amber-400 fill-current" : "text-amber-100/30"
        }`}
        key={i}
      ></FiStar>
    ));

  if (loading) {
    return (
      <div
        className={styles.pageWrapper
          .replace(/bg-gradient-to-r.*/, "")
          .concat("flex items-center justify-center text-amber-100")}
      >
        Loading Now...
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className="max-w-7xl mx-auto">
        <div className={styles.cardContainer}>
          <h2 className={styles.title}>Manage Menu Item</h2>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Category</th>
                  <th className={styles.th}>Price ($)</th>
                  <th className={styles.th}>Rating</th>
                  <th className={styles.th}>Hearts</th>
                  <th className={styles.thCenter}>Delete</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className={styles.tr}>
                    <td className={styles.imgCell}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className={styles.img}
                      />
                    </td>
                    <td className={styles.nameCell}>
                      <div className="space-y-1">
                        <p className={styles.nameText}>{item.name}</p>
                        <p className={styles.descText}>{item.description}</p>
                      </div>
                    </td>
                    <td className={styles.categoryCell}>{item.category}</td>
                    <td className={styles.priceCell}>{item.price}</td>
                    <td className={styles.ratingCell}>
                      <div className="flex gap-1">
                        {renderStar(item.rating)}
                      </div>
                    </td>
                    <td className={styles.heartsCell}>
                      <div className={styles.heartsWrapper}>
                        <FiHeart className="text-xl"></FiHeart>
                        <span>{item.hearts}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className={styles.deleteBtn}
                      >
                        <FiTrash className="text-2xl"></FiTrash>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {items.length === 0 && (
            <div className={styles.emptyState}>No Items found in the menu</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
