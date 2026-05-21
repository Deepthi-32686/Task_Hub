function Registration({sendUser}){
    function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const age = e.target.age.value;

    // sending data via props
    sendUser({ name, age });
  }

 return(
    <>
    <div>
      <h2>Registration Page</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter Name" />
        <br /><br />

        <input type="number" name="age" placeholder="Enter Age" />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
    
    </>
 )

}export default Registration