
function Header() {
  return (
      <div className='bg-[#111010] grid grid-cols-12 gap-2 p-1'>
          <div className="banner col-span-2 flex justify-center ">
              <div>
                  <img src="public\logoimge.png" alt="logo" />
             </div>
          </div>
          <div className="col-span-8 p-4">
              <ul className="flex justify-around text-2xl text-white">
                  <li>Filmes</li>
                  <li>Sessions </li>
                  <li>Reservations</li>
              </ul>
          </div>
          <div className="col-span-2 flex justify-center ">
              <div>
                  <img src="public\userIcon.png" alt="user img" />
              </div>
          </div>
      
    </div>
  )
}

export default Header
