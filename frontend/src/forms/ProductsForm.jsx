import { useEffect, useState } from "react";
import FetchQuality from "../services/Quality/FetchQuality";
import AddNewQuality from "../services/Quality/AddItem";
import { ClipLoader } from "react-spinners";
import DeleteQuality from "../services/Quality/DeletedItem";
import { Plus, X, Edit2, Trash2, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import EditQuality from "../services/Quality/EditQuality";
import AddProduct from "../services/ProductPage/AddProduct";
import FetchProducts from "../services/ProductPage/FetchProducts"
import DeleteProduct from "../services/ProductPage/DeleteProduct";
import EditProduct from "../services/ProductPage/EditProduct";

function QualityForm() {
  const [allqualitydata, setallqualitydata] = useState([]);
  const [EditId, setEditId] = useState(null);
  const [Description, SetDescription] = useState("");
  const [category, setCategory] = useState("Municipal Castings");
  const [file, setfile] = useState(null);
  const [typesofproduct, settypesofproduct] = useState("Physical Testing");
  const [Name, setName] = useState("");
  const [isadd, setisadd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [editedFiles, setEditedFiles] = useState({});
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  // Product categories array
  const productCategories = [
    "Municipal Castings",
    "Water Distribution Equipment",
    "Agricultural Castings",
    "Railway Castings",
    "Counter Weights",
    "High Tension Power Transmission",
    "Miscellaneous Castings"
  ];

  // Calculate pagination values
  useEffect(() => {
    setTotalPages(Math.ceil(allqualitydata.length / itemsPerPage));
  }, [allqualitydata, itemsPerPage]);

  // Get current items
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return allqualitydata.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  async function fetchquality() {
    setIsLoading(true);
    try {
      const get = await FetchProducts();
      setallqualitydata(
        get?.getall?.map((item) => ({
          ...item,
          previewImage: item.image,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileChange = (id, newFile) => {
    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setallqualitydata((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, previewImage: reader.result } : item
          )
        );
      };
      reader.readAsDataURL(newFile);
      
      setEditedFiles(prev => ({
        ...prev,
        [id]: newFile
      }));
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await DeleteProduct(id);
      console.log('deleted', res);
      fetchquality();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleEdit = async (id) => {
    if (EditId === id) {
      const editedItem = allqualitydata.find((item) => item._id === id);
  
      const formData = new FormData();
      formData.append("title", Name || editedItem.title);
      formData.append("description", Description || editedItem.description);
      formData.append("category", category || editedItem.typeofproduct);
     
      if (editedFiles[id]) {
        formData.append("image", editedFiles[id]);
      }
  
      try {
        const res = await EditProduct(formData, id);
        console.log("Edited Response:", res);
        fetchquality();
        setEditId(null);
        setName("");
        SetDescription("");
        setCategory("Municipal Castings");
        setEditedFiles((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      const selectedItem = allqualitydata.find((item) => item._id === id);
      setEditId(id);
      setName(selectedItem.title);
      SetDescription(selectedItem.description);
      setCategory(selectedItem.typeofproduct || "Municipal Castings");
  
      if (!editedFiles[id]) {
        setEditedFiles((prev) => ({
          ...prev,
          [id]: null,
        }));
      }
    }
  };
  
  const handleAdd = () => {
    setisadd(!isadd);
  };

  const handleCategoryChange = (e, id) => {
    const newCategory = e.target.value;
    
    if (id) {
      setallqualitydata(prev =>
        prev.map(item =>
          item._id === id ? { ...item, category: newCategory } : item
        )
      );
    }
    
    setCategory(newCategory);
  };

  async function HandleAddNew() {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", Name);
    formData.append("description", Description);
    formData.append("category", category);
  
    setIsLoading1(true);
    try {
      const res = await AddProduct(formData);
      console.log("added", res);
      setisadd(false);
      setName("");
      SetDescription("");
      setCategory("Municipal Castings");
      setfile(null);
      fetchquality();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading1(false);
    }
  }

  useEffect(() => {
    fetchquality();
  }, []);

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 animate-fade-in">
          Product Manager
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-bounce">
              <ClipLoader size={50} color="#3490dc" loading={isLoading} />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {getCurrentItems().map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-102 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative group">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img
                        src={item.previewImage || item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {EditId === item._id && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(item._id, e.target.files[0])}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="text-center">
                          <span className="text-white text-sm block">
                            {editedFiles[item._id] ? editedFiles[item._id].name : 'Click to change image'}
                          </span>
                          {editedFiles[item._id] && (
                            <span className="text-white text-xs block mt-1">
                              File selected
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <input
                      type="text"
                      value={EditId === item._id ? Name : item.title}
                      onChange={(e) => setName(e.target.value)}
                      readOnly={EditId !== item._id}
                      className="w-full p-2 border rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                    
                    <textarea
                      value={EditId === item._id ? Description : item.description}
                      onChange={(e) => SetDescription(e.target.value)}
                      readOnly={EditId !== item._id}
                      className="w-full p-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      rows={3}
                    />

                    <select
                      value={EditId === item._id ? category : (item.typeofproduct || "Municipal Castings")}
                      onChange={(e) => handleCategoryChange(e, item._id)}
                      disabled={EditId !== item._id}
                      className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      {productCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <div className="flex justify-between gap-4 pt-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(item._id)}
                        className={`flex items-center px-4 py-2 ${
                          EditId === item._id ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white rounded-lg transition-colors duration-300`}
                      >
                        {EditId === item._id ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mb-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === number
                        ? 'bg-blue-500 text-white'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isadd ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'}`}>
          <div className={`bg-white rounded-xl p-6 m-4 max-w-lg w-full transform transition-all duration-300 ${isadd ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Item</h2>
              <button
                onClick={() => setisadd(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="file"
                  onChange={(e) => setfile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center group-hover:border-blue-500 transition-colors duration-300">
                  <span className="text-gray-500 group-hover:text-blue-500">
                    {file ? file.name : 'Click to upload image'}
                  </span>
                </div>
              </div>

              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />

              <textarea
                placeholder="Enter description"
                value={Description}
                onChange={(e) => SetDescription(e.target.value)}
                className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                rows={4}
              />

              <select
                value={category}
                onChange={(e) => handleCategoryChange(e)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                {productCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                onClick={HandleAddNew}
                disabled={isLoading1}
              >
                {isLoading1 ? (
                  <>
                    <ClipLoader size={20} color="#ffffff" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add Item</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleAdd}
            className="group bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            {isadd ? (
              <X className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default QualityForm;