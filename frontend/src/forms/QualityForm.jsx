import { useEffect, useState } from "react";
import FetchQuality from "../services/Quality/FetchQuality";
import AddNewQuality from "../services/Quality/AddItem";
import { ClipLoader } from "react-spinners";
import DeleteQuality from "../services/Quality/DeletedItem";
import { Plus, X, Edit2, Trash2, Save, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import EditQuality from "../services/Quality/EditQuality";

function QualityForm() {
  const [allqualitydata, setallqualitydata] = useState([]);
  const [EditId, setEditId] = useState(null);
  const [Description, SetDescription] = useState("");
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

  async function fetchquality() {
    setIsLoading(true);
    try {
      const get = await FetchQuality();
      const qualityData = get.map((item) => ({
        ...item,
        previewImage: item.image,
      }));
      setallqualitydata(qualityData);
      setTotalPages(Math.ceil(qualityData.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching quality data:", error);
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
      await DeleteQuality(id);
      await fetchquality();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = async (id) => {
    if (EditId === id) {
      const editedItem = allqualitydata.find((item) => item._id === id);
      if (!editedItem) return;

      const formData = new FormData();
      formData.append("name", Name || editedItem.name);
      formData.append("description", Description || editedItem.description);
      formData.append("typeofproduct", typesofproduct || editedItem.typeofproduct);
      if (editedFiles[id]) {
        formData.append("image", editedFiles[id]);
      }
  
      try {
        await EditQuality(formData, id);
        await fetchquality();
  
        // Reset states
        setEditId(null);
        setName("");
        SetDescription("");
        setEditedFiles((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        settypesofproduct("Physical Testing");
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      const selectedItem = allqualitydata.find((item) => item._id === id);
      if (!selectedItem) return;

      setEditId(id);
      setName(selectedItem.name);
      SetDescription(selectedItem.description);
      settypesofproduct(selectedItem.typeofproduct);
  
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
    if (!isadd) {
      // Reset form when opening
      setName("");
      SetDescription("");
      setfile(null);
      settypesofproduct("Physical Testing");
    }
  };

  const handleTypeChange = (e, id) => {
    const newType = e.target.value;
    settypesofproduct(newType);
    
    setallqualitydata(prev =>
      prev.map(item =>
        item._id === id ? { ...item, typeofproduct: newType } : item
      )
    );
  };

  async function HandleAddNew() {
    if (!file || !Name || !Description) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", Name);
    formData.append("description", Description);
    formData.append("typeofproduct", typesofproduct);

    setIsLoading1(true);
    try {
      await AddNewQuality(formData);
      setisadd(false);
      setName("");
      SetDescription("");
      setfile(null);
      await fetchquality();
    } catch (error) {
      console.error("Error adding new item:", error);
    } finally {
      setIsLoading1(false);
    }
  }

  const handlePageChange = (pageNumber) => {
    pageNumber = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setTotalPages(Math.ceil(allqualitydata.length / newItemsPerPage));
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allqualitydata.slice(indexOfFirstItem, indexOfLastItem);

  const getPageRange = () => {
    const delta = 2;
    let range = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    if (totalPages > 1) {
      range.unshift(1);
      range.push(totalPages);
    }

    return range;
  };

  useEffect(() => {
    fetchquality();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(allqualitydata.length / itemsPerPage));
  }, [allqualitydata, itemsPerPage]);

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Quality Manager
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-bounce">
              <ClipLoader size={50} color="#3490dc" loading={isLoading} />
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Items per page:</label>
                <select 
                  className="border rounded p-1 text-sm bg-white focus:ring-2 focus:ring-blue-500"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative group">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img
                        src={item.previewImage || item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {EditId === item._id && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileChange(item._id, e.target.files[0])}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept="image/*"
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
                      value={EditId === item._id ? Name : item.name}
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
                      value={EditId === item._id ? typesofproduct : item.typeofproduct}
                      onChange={(e) => handleTypeChange(e, item._id)}
                      disabled={EditId !== item._id}
                      className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      <option>Physical Testing</option>
                      <option>Wet Chemical Laboratory Equipment</option>
                      <option>Item For Infrastructure</option>
                      <option>SAND TESTING EQUIPMENT</option>
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

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 bg-white p-4 rounded-lg shadow mb-8">
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, allqualitydata.length)} of {allqualitydata.length} items
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50 text-blue-500'
                      }`}
                    >
                      <ChevronsLeft className="w-5 h-5" />
                    </button>
                    
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50 text-blue-500'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {getPageRange().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                        className={`w-10 h-10 flex items-center justify-center rounded-md ${
                          page === '...' 
                            ? 'text-gray-400 cursor-default' 
                            : page === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-blue-50 text-blue-500'
                        }`}
                        disabled={page === '...'}
                      >
                        {page}
                      </button>
                    ))}

                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        currentPage === totalPages 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'hover:bg-blue-50 text-blue-500'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <button 
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        currentPage === totalPages 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'hover:bg-blue-50 text-blue-500'
                      }`}
                    >
                      <ChevronsRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="fixed bottom-8 right-8">
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                {isadd ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Plus className="w-6 h-6" />
                )}
              </button>
            </div>

            {isadd && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Quality Item</h2>
                    <button
                      onClick={handleAdd}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={Description}
                        onChange={(e) => SetDescription(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Enter description"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type of Product
                      </label>
                      <select
                        value={typesofproduct}
                        onChange={(e) => settypesofproduct(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Physical Testing</option>
                        <option>Wet Chemical Laboratory Equipment</option>
                        <option>Item For Infrastructure</option>
                        <option>SAND TESTING EQUIPMENT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setfile(e.target.files ? e.target.files[0] : null)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        accept="image/*"
                        required
                      />
                    </div>

                    <button
                      onClick={HandleAddNew}
                      disabled={isLoading1}
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                    >
                      {isLoading1 ? (
                        <ClipLoader size={20} color="#ffffff" loading={isLoading1} />
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2" />
                          Add Item
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default QualityForm;