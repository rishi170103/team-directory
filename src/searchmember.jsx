function searchmemember({search,setSearch}){
    return(
        
        <input type="text" placeholder="search by name" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    );
    
}
export default searchmemember;