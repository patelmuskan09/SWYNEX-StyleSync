
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search, Heart, UserRound, Menu, ArrowRight, Sparkles,
  Shirt, Layers3, Plus, LayoutGrid, X, Trash2, Pencil,
  Footprints, ShoppingBag, Star, ChevronLeft
} from "lucide-react";
import "./HomeFeatures.css";

const API_URL = "http://localhost:5000/api/clothing";
const USER_ID = "muskan-local-user";

const categories = [
  {
    name: "Tops",
    description: "Everyday favourites",
    image: "https://i.pinimg.com/736x/89/6f/d5/896fd5cd1ff9e5eb0b890d38f19fdc8b.jpg"
  },
  {
    name: "Dresses",
    description: "Made for every moment",
    image: "https://i.pinimg.com/736x/95/09/f9/9509f92593382db846372d19c19e1e48.jpg"
  },
  {
    name: "Denim",
    description: "Timeless essentials",
    image: "https://i.pinimg.com/736x/d9/b3/18/d9b31825f3227a86a2a6312ea1bb43cd.jpg"
  },
  {
    name: "Shoes",
    description: "Step out in style",
    image: "https://i.pinimg.com/736x/5e/02/af/5e02af5b81de0e9812e26ba5b2815f9b.jpg"
  },
  {
    name: "Bags",
    description: "Carry your style",
    image: "https://i.pinimg.com/736x/4b/f0/17/4bf0177312b71a4986ff2551710554a0.jpg"
  },
  {
    name: "Accessories",
    description: "The finishing touch",
    image: "https://i.pinimg.com/736x/58/0f/57/580f57607b1f792e8b3f3f7c1732e878.jpg"
  }
];

const emptyForm = {
  name: "",
  category: "Tops",
  color: "",
  size: "",
  imageUrl: ""
};

function Logo() {
  return (
    <a href="#home" className="logo">
      <img
        src="/stylesync-logo.PNG"
        alt="StyleSync logo"
        className="logo-image"
      />
      StyleSync<span>.</span>
    </a>
  );
}

function Home() {
  const [clothing, setClothing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("stylesync-wishlist") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [wishlistOnly, setWishlistOnly] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Load clothing from the existing backend
  const fetchClothing = async () => {
    try {
      setError("");
      const response = await axios.get(API_URL);
      setClothing(response.data.data || []);
    } catch (err) {
      setError(
        "Couldn't connect to your wardrobe. Make sure your backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothing();
  }, []);

  // Save wishlist in this browser
  useEffect(() => {
    localStorage.setItem(
      "stylesync-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const openAddForm = (category = "Tops") => {
    setEditingId(null);
    setForm({ ...emptyForm, category });
    setError("");
    setSuccess("");
    setFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      category: item.category || "Tops",
      color: item.color || "",
      size: item.size || "",
      imageUrl: item.imageUrl || ""
    });
    setError("");
    setSuccess("");
    setFormOpen(true);
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add or update a clothing item
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      userId: USER_ID
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
        setSuccess("Your clothing item has been updated!");
      } else {
        await axios.post(API_URL, payload);
        setSuccess("Your clothing item has been added!");
      }

      setFormOpen(false);
      setForm(emptyForm);
      setEditingId(null);
      await fetchClothing();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong while saving. Please check your details."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete a clothing item
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this clothing item?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setClothing((items) =>
        items.filter((item) => item._id !== id)
      );

      setWishlist((items) =>
        items.filter((itemId) => itemId !== id)
      );

      setSuccess("Clothing item deleted.");
    } catch {
      setError("Couldn't delete this item. Please try again.");
    }
  };

  // Add or remove a favourite
  const toggleWishlist = (id) => {
    setWishlist((items) =>
      items.includes(id)
        ? items.filter((itemId) => itemId !== id)
        : [...items, id]
    );
  };

  const openCategory = (name) => {
    setActiveCategory(name);
    setWishlistOnly(false);

    document.getElementById("my-wardrobe")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  // Filter clothing by category, wishlist and search
  const filteredClothing = useMemo(() => {
    return clothing.filter((item) => {
      const categoryMatch =
        activeCategory === "All" ||
        item.category === activeCategory;

      const wishlistMatch =
        !wishlistOnly || wishlist.includes(item._id);

      const search = searchTerm.trim().toLowerCase();

      const searchMatch =
        !search ||
        [item.name, item.category, item.color, item.size]
          .some((value) =>
            String(value || "").toLowerCase().includes(search)
          );

      return categoryMatch && wishlistMatch && searchMatch;
    });
  }, [
    clothing,
    activeCategory,
    wishlistOnly,
    wishlist,
    searchTerm
  ]);

  const selectedCategory = categories.find(
    (category) => category.name === activeCategory
  );

  const closePanels = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <div className="website">

      {/* Decorative hearts and sparkles */}
      <div className="site-sprinkles" aria-hidden="true">
        <span className="sprinkle heart heart-one">♡</span>
        <span className="sprinkle sparkle sparkle-one">✦</span>
        <span className="sprinkle heart heart-two">♥</span>
        <span className="sprinkle sparkle sparkle-two">✧</span>
        <span className="sprinkle heart heart-three">♡</span>
        <span className="sprinkle sparkle sparkle-three">✦</span>
        <span className="sprinkle heart heart-four">♡</span>
        <span className="sprinkle sparkle sparkle-four">✧</span>
        <span className="sprinkle bubble bubble-one"></span>
        <span className="sprinkle bubble bubble-two"></span>
        <span className="sprinkle bubble bubble-three"></span>
        <span className="sprinkle bubble bubble-four"></span>
        <span className="sprinkle heart heart-five">♡</span>
        <span className="sprinkle heart heart-six">♥</span>
        <span className="sprinkle heart heart-seven">♡</span>
        <span className="sprinkle heart heart-eight">♡</span>
        <span className="sprinkle sparkle sparkle-five">✦</span>
        <span className="sprinkle sparkle sparkle-six">✧</span>
        <span className="sprinkle sparkle sparkle-seven">✦</span>
        <span className="sprinkle sparkle sparkle-eight">✧</span>
        <span className="sprinkle bubble bubble-five"></span>
        <span className="sprinkle bubble bubble-six"></span>
      </div>

      <div className="announcement">
        A LITTLE SPACE FOR YOUR PERSONAL STYLE ✦
      </div>

      {/* Header */}
      <header className="header">
        <button
          className="mobile-menu"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Logo />

        <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
          <a href="#home" onClick={closePanels}>Home</a>
          <a href="#categories" onClick={closePanels}>Explore</a>
          <a href="#my-wardrobe" onClick={closePanels}>My Wardrobe</a>
          <a href="#about" onClick={closePanels}>About</a>
        </nav>

        <div className="header-icons">
          <button
            aria-label="Search wardrobe"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setWishlistOnly(false);

              setTimeout(() => {
                document.getElementById("wardrobe-search")?.focus();
              }, 0);
            }}
          >
            <Search />
          </button>

          <button
            aria-label="Wishlist"
            onClick={() => {
              setWishlistOnly(!wishlistOnly);
              setActiveCategory("All");

              document.getElementById("my-wardrobe")?.scrollIntoView({
                behavior: "smooth"
              });
            }}
          >
            <Heart fill={wishlistOnly ? "currentColor" : "none"} />
          </button>

          <button
            aria-label="My profile"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <UserRound />
          </button>
        </div>
      </header>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="mobile-menu-panel">
          <a href="#home" onClick={closePanels}>Home</a>
          <a href="#categories" onClick={closePanels}>Explore categories</a>
          <a href="#my-wardrobe" onClick={closePanels}>My Wardrobe</a>

          <button
            onClick={() => {
              setWishlistOnly(true);
              setActiveCategory("All");
              setMenuOpen(false);

              document.getElementById("my-wardrobe")?.scrollIntoView({
                behavior: "smooth"
              });
            }}
          >
            <Heart size={17} /> My Wishlist
          </button>

          <a href="#about" onClick={closePanels}>About</a>
        </div>
      )}

      {/* Profile panel */}
      {profileOpen && (
        <div className="profile-panel">
          <button
            className="panel-close"
            onClick={() => setProfileOpen(false)}
          >
            <X size={18} />
          </button>

          <div className="profile-avatar">
            <UserRound size={30} />
          </div>

          <h3>My Style Profile</h3>
          <p>Your personal StyleSync space.</p>

          <div className="profile-stats">
            <div>
              <strong>{clothing.length}</strong>
              <span>Wardrobe items</span>
            </div>

            <div>
              <strong>{wishlist.length}</strong>
              <span>Favourites</span>
            </div>
          </div>

          <button
            className="profile-action"
            onClick={() => {
              setProfileOpen(false);
              openAddForm();
            }}
          >
            <Plus size={16} /> Add clothing
          </button>
        </div>
      )}

      {/* Search */}
      {searchOpen && (
        <div className="search-strip">
          <Search size={19} />

          <input
            id="wardrobe-search"
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                document.getElementById("my-wardrobe")?.scrollIntoView({
                  behavior: "smooth"
                });
              }
            }}
            placeholder="Search by clothing name, colour or category..."
          />

          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setSearchTerm("");
              setSearchOpen(false);
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      <main id="home">

        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">YOUR PERSONAL STYLE SPACE</p>

            <h1>
              Your wardrobe,<br />
              <em>your story.</em>
            </h1>

            <p className="hero-description">
              A little organization, a little inspiration,
              and a whole lot of you. Bring your wardrobe
              together in one beautiful space.
            </p>

            <a href="#my-wardrobe" className="primary-button">
              EXPLORE MY WARDROBE <ArrowRight size={17} />
            </a>
          </div>

          <div className="hero-image">
            <img
              src="https://i.pinimg.com/736x/47/44/cb/4744cbc02aab2ef508a0370da5da296c.jpg"
              alt="StyleSync wardrobe inspiration"
            />

            <div className="image-note">
              <Sparkles size={16} />
              <span>Find your everyday style</span>
            </div>
          </div>
        </section>

        {/* Explore categories */}
        <section className="categories-section" id="categories">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A PLACE FOR EVERYTHING</p>
              <h2>Explore your wardrobe</h2>
            </div>

            <a href="#my-wardrobe" className="text-link">
              View my closet <ArrowRight size={16} />
            </a>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                className="category-card"
                key={category.name}
                onClick={() => openCategory(category.name)}
              >
                <div className="category-image">
                  <img
                    src={category.image}
                    alt={`${category.name} category`}
                    loading="lazy"
                  />
                </div>

                <div className="category-info">
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>

                  <ArrowRight size={19} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Wardrobe introduction */}
        <section className="wardrobe-section" id="wardrobe">
          <div className="wardrobe-content">
            <p className="eyebrow">YOUR CLOSET, ALL IN ONE PLACE</p>
            <h2>A wardrobe that feels like you.</h2>

            <p>
              Keep track of your favourite pieces, organize
              your clothing collection and make getting dressed
              a little more exciting.
            </p>

            <a href="#my-wardrobe" className="primary-button">
              DISCOVER MY CLOSET <ArrowRight size={17} />
            </a>
          </div>

          <div className="wardrobe-illustration">
            <div className="wardrobe-icon">
              <Shirt size={52} strokeWidth={1} />
              <Layers3 size={30} strokeWidth={1} />
            </div>

            <span>Made for your style.</span>
          </div>
        </section>

        {/* My wardrobe */}
        <section className="my-wardrobe" id="my-wardrobe">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR PERSONAL COLLECTION</p>

              <h2>
                {wishlistOnly
                  ? "My Wishlist"
                  : activeCategory === "All"
                    ? "My Wardrobe"
                    : `My ${activeCategory}`}
              </h2>

              <p>
                {wishlistOnly
                  ? "All your favourite pieces in one place."
                  : selectedCategory?.description ||
                    "Every piece you own, thoughtfully organized in one place."}
              </p>
            </div>

            <button
              className="primary-button"
              type="button"
              onClick={() =>
                openAddForm(
                  activeCategory === "All" ? "Tops" : activeCategory
                )
              }
            >
              <Plus size={17} /> ADD CLOTHING
            </button>
          </div>

          <div className="wardrobe-toolbar">
            <div className="category-filters">
              <button
                className={
                  activeCategory === "All" && !wishlistOnly ? "active" : ""
                }
                onClick={() => {
                  setActiveCategory("All");
                  setWishlistOnly(false);
                }}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category.name}
                  className={
                    activeCategory === category.name && !wishlistOnly
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setActiveCategory(category.name);
                    setWishlistOnly(false);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {(activeCategory !== "All" || wishlistOnly || searchTerm) && (
              <button
                className="clear-filter"
                onClick={() => {
                  setActiveCategory("All");
                  setWishlistOnly(false);
                  setSearchTerm("");
                }}
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {error && !formOpen && (
            <div className="app-message error-message">{error}</div>
          )}

          {success && (
            <div className="app-message success-message">{success}</div>
          )}

          {loading ? (
            <div className="empty-wardrobe">
              <p>Loading your wardrobe...</p>
            </div>
          ) : filteredClothing.length === 0 ? (
            <div className="empty-wardrobe">
              <div className="empty-wardrobe-icon">
                {wishlistOnly ? (
                  <Heart size={32} />
                ) : (
                  <LayoutGrid size={32} />
                )}
              </div>

              <h3>
                {searchTerm
                  ? "No matching clothing found."
                  : wishlistOnly
                    ? "Your wishlist is waiting."
                    : `No ${activeCategory === "All" ? "clothing items" : activeCategory.toLowerCase()} added yet.`}
              </h3>

              <p>
                {searchTerm
                  ? "Try another name, colour, category or size."
                  : "Add your first piece and start building your personal digital closet."}
              </p>

              {!searchTerm && (
                <button
                  className="text-link"
                  type="button"
                  onClick={() =>
                    openAddForm(
                      activeCategory === "All" ? "Tops" : activeCategory
                    )
                  }
                >
                  <Plus size={17} /> Add your first item
                </button>
              )}
            </div>
          ) : (
            <div className="clothing-grid">
              {filteredClothing.map((item) => (
                <article className="clothing-card" key={item._id}>
                  <div className="clothing-card-image">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} />
                    ) : (
                      <div className="no-clothing-image">
                        <Shirt size={42} />
                        <span>{item.category}</span>
                      </div>
                    )}

                    <button
                      className={`favourite-button ${
                        wishlist.includes(item._id)
                          ? "favourite-active"
                          : ""
                      }`}
                      aria-label="Toggle favourite"
                      onClick={() => toggleWishlist(item._id)}
                    >
                      <Heart
                        size={19}
                        fill={
                          wishlist.includes(item._id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  <div className="clothing-card-info">
                    <div>
                      <h3>{item.name}</h3>
                      <p>
                        {item.category} · {item.color} · {item.size}
                      </p>
                    </div>

                    <div className="clothing-actions">
                      <button
                        onClick={() => openEditForm(item)}
                        aria-label="Edit item"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        aria-label="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Add / Edit clothing modal */}
      {formOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setFormOpen(false)}
        >
          <div
            className="clothing-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="panel-close"
              onClick={() => setFormOpen(false)}
              aria-label="Close form"
            >
              <X size={20} />
            </button>

            <p className="eyebrow">YOUR PERSONAL COLLECTION</p>

            <h2>
              {editingId ? "Edit your piece" : "Add to your wardrobe"}
            </h2>

            <p className="modal-description">
              Give your favourite pieces a place of their own.
            </p>

            {error && (
              <div className="app-message error-message">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="clothing-form">
              <label>
                Clothing name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Blue denim jacket"
                  required
                />
              </label>

              <label>
                Category
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  required
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-two-columns">
                <label>
                  Colour
                  <input
                    name="color"
                    value={form.color}
                    onChange={handleFormChange}
                    placeholder="e.g. Blue"
                    required
                  />
                </label>

                <label>
                  Size
                  <input
                    name="size"
                    value={form.size}
                    onChange={handleFormChange}
                    placeholder="e.g. M"
                    required
                  />
                </label>
              </div>

              <label>
                Image URL
                <input
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={handleFormChange}
                  placeholder="Paste a Pinterest image URL"
                />
              </label>

              {form.imageUrl && (
                <img
                  className="form-image-preview"
                  src={form.imageUrl}
                  alt="Clothing preview"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <button
                className="primary-button form-submit"
                disabled={saving}
              >
                {saving
                  ? "SAVING..."
                  : editingId
                    ? "SAVE CHANGES"
                    : "ADD TO MY WARDROBE"}

                <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer" id="about">
        <Logo />
        <p>Organize your closet. Celebrate your style.</p>
        <span className="copyright">
          © 2026 StyleSync. Made with love.
        </span>
      </footer>
    </div>
  );
}

export default Home;
