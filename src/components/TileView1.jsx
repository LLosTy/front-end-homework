import React, { useState} from "react";


// Add a card with the title of the list
// the lists should be stored inside an array
// the button should navigate to "/#name of list#" 
// the list will be iterated through a for loop
// the index will be used for the destination of the button
// adding a list
// filtering (archived/not archived)
// deleting a list (only owner -- just do this by toggle) -> maybe a variable like 'toBeDeleted' that stores which list i want to delete
// archiving a list (just add into archived array(the same as items in a list))
// toggle between owner and not owner
//              ===TODO===
// Final touchups
// LETS NOT DO ROUTING RN CAUSE IT PROLLY WONT WORK --- THE MAIN GOAL IS TO JUST DISPLAY THEM


const TileView1 = () => {
    const [lists, setList] = useState([
        "List1",
        "List2",
        "List3"
      ]);

  const [newList, setNewList] = useState('');


      const handleAddList = () => {
        if (newList.trim() !== '') {
          setList([...lists, newList]);
          setNewList('');
        }
      };

      const handleRemoveList = (index) => {
        const updatedLists = [...lists];
        updatedLists.splice(index, 1);
        setList(updatedLists)
        setCurrentIndexActive(null) //Set to null just in case
      }
    
      const handleRemoveArchivedList = (index) => {
        const updatedLists = [...archivedLists];
        updatedLists.splice(index, 1);
        setArchivedList(updatedLists)
        setCurrentIndexArchived(null) //Set to null just in case
      }


      

      //       const [resolvedItems, setResolvedItems] = useState([]);
      const[archivedLists, setArchivedList] = useState([]);

      const handleAddToArchived = (index) => {
            const archivedList = lists[index];
            setArchivedList([...archivedLists, archivedList]);
        
            // Remove the resolved item from the original items list
            const updatedLists = [...lists];
            updatedLists.splice(index, 1);
            setList(updatedLists);
          };


    //   const handleAddToResolved = (index) => {
    //     const resolvedItem = items[index];
    //     setResolvedItems([...resolvedItems, resolvedItem]);
    
    //     // Remove the resolved item from the original items list
    //     const updatedItems = [...items];
    //     updatedItems.splice(index, 1);
    //     setItems(updatedItems);
    //   };

    let [isActiveVisible, setActiveVisible] = useState(true);
    let [isArchivedVisible, setArchivedVisible] = useState(true);

    const handleToggleAllVisible = () => {
        setActiveVisible(isActiveVisible = true);
        setArchivedVisible(isArchivedVisible = true);
    }

    const handleActiveVisible = () => {
        setActiveVisible(isActiveVisible = true);
        setArchivedVisible(isArchivedVisible = false);
    }

    const handleArchivedVisible = () => {
        setActiveVisible(isActiveVisible = false);
        setArchivedVisible(isArchivedVisible = true);
    }


    const [currentIndexActive, setCurrentIndexActive] = useState(null)
    const [currentIndexArchived, setCurrentIndexArchived] = useState(null)

    const [isOwner, setIsOwner] = useState(true);

    const handleSetOwner = () => {
        setIsOwner(!isOwner);
    }

    // const handleDeleteListActive = (index) => {
    //     // handleRemoveList(index)
    //     // const indexActive = index
    //     setCurrentIndexActive(index);
    // }


    return(
        <div>
            <div class="form-check form-switch d-flex justify-content-end p-2 ">
                <input class="form-check-input me-2" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isOwner}  onChange={handleSetOwner}></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">Is Owner: {isOwner ? "True" : "False"}</label>
            </div>
      

        <div class="d-flex justify-content-center p-2">
            <div class="btn-group" role="group" aria-label="Basic example">
                {/* <button type="button" class={`btn btn-primary ${(isResolvedVisible && isUnresolvedVisible) === true ? 'active' : ''}`} onClick={handleToggleAll}>All</button> */}
                <button type="button" class={`btn btn-primary ${(isActiveVisible && isArchivedVisible) === true ? 'active' : ''} `} onClick={handleToggleAllVisible}>All</button>

                {/* for some reason the logic is flipped or im just stupid lol */}
                {/* Fix the resolved and unresolved filter (is flipped in the rendering below) */}
                <button type="button" class={`btn btn-primary ${(isActiveVisible === true) && (isArchivedVisible === false) ? 'active' : ''}`} onClick={handleActiveVisible}>Active</button> 
                <button type="button" class={`btn btn-primary ${(isActiveVisible === false) && (isArchivedVisible === true) ? 'active' : ''}`} onClick={handleArchivedVisible}>Archived</button>
            </div>
        </div>
        
            
            {isActiveVisible ? 
            <>

                <h1 className='p-1 m-2'>Active Lists</h1>
                <div class="row row-cols-auto row-cols-md-auto g-2 m-1">
                    {lists.map((list,index) => (
                          <div class="col">
                            <div class="card mb-3">
                                <div class="card-body">
                                        {/* <a class ="btn"href={`/${list}`}> */}
                                            <h4 class="card-title">
                                                {list}
                                            </h4>
                                        {/* </a> */}
                                    {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                    <a class="btn btn-primary m-1" href={`/${list}`}>Go to list</a>
                                    <a class="btn btn-warning m-1" onClick={() => handleAddToArchived(index)}>Archive list</a>
                                    {/* <a class="btn btn-danger" onClick={() => handleRemoveList(index)}>Delete list</a> */}
                                 {/* <!-- Button trigger modal --> */}

                                {isOwner ? 
                                    <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setCurrentIndexActive(index)}>
                                    Delete list
                                    </button> :
                                    <div> </div>
                                 
                                }

                                        {/* <!-- Modal --> */}
                                        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Active List</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Are you sure you wish to delete active list: {lists[currentIndexActive]}
                                                {/* {currentIndexActive} */}
                                                {/* {lists[currentIndexActive]} */}
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" onClick={() => handleRemoveList(currentIndexActive)} data-bs-dismiss="modal">Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        ))
                    }
                    </div>


                </> : 
                <div></div>
            
        }
            {isArchivedVisible?  
            <>
                <h1 className='p-1 m-2'>Archived Lists</h1>
                <div class="row row-cols-auto row-cols-md-auto g-2 m-1">
                    {archivedLists.map((listArchived,indexArchived) => (
                          <div class="col">
                            <div class="card mb-3">
                                <div class="card-body">
                                        {/* <a class ="btn"href={`/${list}`}> */}
                                            <h5 class="card-title">
                                                {listArchived}
                                            </h5>
                                        {/* </a> */}
                                    {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                    <a class="btn btn-primary m-1" href={`/${listArchived}`}>Go to list</a>
                                    {/* <a class="btn btn-warning" onClick={() => handleAddToArchived(indexArchived)}>Archive list</a> */}
                                    {/* <a class="btn btn-danger" onClick={() => handleRemoveArchivedList(indexArchived)}>Delete list</a> */}

                                    {isOwner ? 
                                    <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#deleteModalArchived" onClick={() => setCurrentIndexArchived(indexArchived)}>
                                        Delete list
                                        </button>
                                        :
                                        <div></div>

                                    }

                                        {/* <!-- Modal --> */}
                                        <div class="modal fade" id="deleteModalArchived" tabindex="-1" aria-labelledby="deleteModalArchivedLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="deleteModalArchivedLabel">Delete Archived List</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Are you sure you wish to delete archived list: {archivedLists[currentIndexArchived]}
                                                {/* {currentIndexActive} */}
                                                {/* {lists[currentIndexActive]} */}
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" onClick={() => handleRemoveArchivedList(currentIndexArchived)} data-bs-dismiss="modal">Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                                </div>

                            </div>
                        ))
                    }
                    </div>
            
            </>
            : 
            <div></div>
            
        }
            {/* {archivedLists} */}
            {/* <!-- Button trigger modal --> */}
            <div class="d-flex justify-content-center mt-5 m-2 p-2">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add new list
                </button>
            </div>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Add new list</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6>New List name:</h6>
                        <input class="form-control" type="text" placeholder="Default input" aria-label="default input example" value={newList} onChange={(e) => setNewList(e.target.value)}></input>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button 
                        type="button" 
                        class="btn btn-primary"
                        onClick={handleAddList}
                        >Add new list</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>

    );
};
export default TileView1;