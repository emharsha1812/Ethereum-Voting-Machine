function UserHome(props) {
  return (
    <div>
      <div class="mockup-window border bg-base-300">
        <div class="flex justify-center bg-base-200 px-4 py-16">
          {/* <h1 className="flex items-center justify-center">
            {props.el.electionTitle}
          </h1> */}
          <br />

          {/* <center className="">{props.el.organizationTitle}</center> */}
          <table className="mt-[21px] flex flex-col">
            <tr>
              <th className="text-lg">admin:- </th>
              <td className="text-green-400">
                {props.el.adminName} ({props.el.adminTitle})
              </td>
            </tr>
            <tr>
              <th className="text-lg">contact:- </th>
              <td className="text-green-400">{props.el.adminEmail}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserHome
