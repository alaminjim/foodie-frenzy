import { useState } from "react";
import { styles } from "../../public/dummyadmin";
import { FiHeart, FiStar, FiUpload } from "react-icons/fi";
import axios from "axios";
import { TbCurrencyTaka } from "react-icons/tb";
import toast from "react-hot-toast";

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: 0,
    hearts: 0,
    total: 0,
    image: null,
    preview: "",
  });

  const [categories] = useState([
    "Breakfast",
    "Lunch",
    "Dinner",
    "Mexican",
    "Italian",
    "Desserts",
    "Drinks",
  ]);

  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   for image up

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleRating = (rating) => setFormData((prev) => ({ ...prev, rating }));
  const handleHeart = () =>
    setFormData((prev) => ({ ...prev, hearts: prev.hearts + 1 }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === "preview") return;
        payload.append(key, val);
      });

      const res = await axios.post("http://localhost:4000/api/items", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        rating: 0,
        hearts: 0,
        total: 0,
        image: null,
        preview: "",
      });
      toast.success("Item Added Successful");
      formData.reset();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className="max-w-4xl mx-auto">
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Add New Menu Item</h2>
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            <div className={styles.uploadWrapper}>
              <label className={styles.uploadLabel}>
                {formData.preview ? (
                  <img
                    src={formData.preview}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                ) : (
                  <div className="text-center [-4">
                    <FiUpload className={styles.uploadIcon}></FiUpload>
                    <p className={styles.uploadText}>
                      Click to upload product image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </label>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Enter Your Product name..."
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-base sm:text-lg text-amber-400">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description..."
                className={
                  styles.inputField +
                  "h-32 sm:h-40 placeholder:text-amber-100/50"
                }
                required
              ></textarea>
            </div>

            <div className={styles.gridTwoCols}>
              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  required
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#3a2b2b]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400">
                  Price ($)
                </label>

                <div className={styles.relativeInput}>
                  <TbCurrencyTaka className={styles.rupeeIcon}></TbCurrencyTaka>
                  <input
                    type="number"
                    name="price"
                    value={formData.value}
                    onChange={handleInputChange}
                    className={styles.inputField + "pl-10 sm:pl-12"}
                    min="0"
                    step="0.01"
                    required
                    placeholder="Enter Price"
                  />
                </div>
              </div>
            </div>
            <div className={styles.gridTwoCols}>
              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl sm:'text-3xl transition-transform hover:scale-110"
                    >
                      <FiStar
                        className={
                          star <= (hoverRating || formData.rating)
                            ? "text-amber-400 fill-current"
                            : "text-amber-100/30"
                        }
                      ></FiStar>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-base sm:text-lg text-amber-400">
                  Popularity
                </label>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleHeart}
                    className="text-2xl sm:text-3xl text-amber-400 hover:text-amber-300 transition-colors animate-pulse"
                  >
                    <FiHeart></FiHeart>
                  </button>
                  <input
                    type="number"
                    name="hearts"
                    value={formData.hearts}
                    onChange={handleInputChange}
                    className={styles.inputField + "pl-10 sm:pl-12"}
                    placeholder="Enter Likes"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className={styles.actionBtn}>
              Add To Menu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
