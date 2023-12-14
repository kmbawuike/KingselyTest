import { useState, useEffect } from "react";
import { getSectors, getUsers } from "../services";
import { SectorType, UserType } from "../type";
import AddSector from "./AddSector";
import AddUser from "./AddUser";
import Button from "./Button";
import Table from "./Table";
import LoadingIndicator from "./LoadingIndicator";

function Main() {
  const [modals, setModals] = useState({
    addUser: false,
    addSector: false
  })
  const [data, setData] = useState<{
    loading: boolean;
    sectors: SectorType[],
    users: UserType[],
    allUsers: UserType[],
    user: UserType | undefined
  }>({
    loading: false,
    sectors: [],
    users: [],
    allUsers: [],
    user: undefined
  })

  const handleGetSectors = async () => {
    try {
      setData((d) => ({ ...d, loading: true }))
      const res = await getSectors()
      if (res && res?.data?.data) {
        setData((d) => ({ ...d, sectors: res.data.data, loading: false }))
      }
    } catch (error) {
      setData((d) => ({ ...d, loading: true }))
    }
  }

  const handleGetUsers = async () => {
    try {
      setData((d) => ({ ...d, loading: true }))
      const res = await getUsers()
      if (res && res?.data?.data) {
        setData((d) => ({ ...d, users: res.data.data, allUsers: res.data.data, loading: false }))
      }
    } catch (error) {
      setData((d) => ({ ...d, loading: true }))
    }
  }

  useEffect(() => {
    handleGetSectors()
    handleGetUsers()
  }, [])

  return (
    <>
      {/* Start block */}
      <section className="bg-gray-50 p-3 sm:p-5 antialiased h-screen">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* Start coding here */}
          <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <h1 className='p-4 text-xl font-bold'>Users</h1>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                      placeholder="Search"
                      onChange={(e) => setData((d) => ({ ...d, users: d.allUsers.filter((u) => u.name.toLowerCase().includes(e.target.value.toLowerCase())) }))}
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Button type="button" variant="normal" title='Add User'
                  onClick={() => {
                    setModals((m) => ({ ...m, addUser: true }))
                    setData((m) => ({ ...m, user: undefined }))
                  }}
                />

                <Button variant="outline" title='Add Sector' onClick={() => {
                  setModals((m) => ({ ...m, addSector: true }))
                }} />
              </div>
            </div>
            <Table users={data.users as unknown as UserType[]} pickUser={(user) => {
              setData((d) => ({ ...d, user }))
              setModals((d) => ({ ...d, addUser: true }))
            }} />
          </div>
        </div>
      </section>
      <AddUser cleanUpFunc={handleGetUsers} open={modals.addUser} close={() => setModals((m) => ({ ...m, addUser: false }))} user={data.user} />
      <AddSector open={modals.addSector} close={() => setModals((m) => ({ ...m, addSector: false }))} />

      {data.loading && <LoadingIndicator />}

    </>

  );
}

export default Main;
