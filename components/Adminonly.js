const Adminonly = (props) => {
  return (
    <div className="m-4 bg-teal-400 p-6 text-black  ">
      <center>
        <div>
          <h1>{props.page}</h1>
        </div>
        <p>Admin Access only</p>
      </center>
    </div>
  )
}

export default Adminonly
