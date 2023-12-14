import React from 'react'
import { UserType } from '../type'
import moment from 'moment'

type TableProps = {
  users: UserType[],
  pickUser: (user: UserType)=> void
}
export default function Table({ users, pickUser }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-4">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Sectors
            </th>
      
            <th scope="col" className="px-4 py-3">
              Date Created
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, k) => (
            <tr className="border-b" key={k}>
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
              >
                {u.name}
              </th>
              <td className="px-4 py-3 max-w-[400px] flex items-center flex-wrap">
                {u.sectors.map((s, kk) => (
                <span key={kk} className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded mb-2">{s.name}</span>
                ))}
              </td>
            
              <td className="px-4 py-3">{moment(u.createdDate).format('Do MMMM, YYYY') }</td>
              <td className="px-4 py-3 flex items-center justify-end">
                <button
                  type="button"
                  className="flex items-center py-2 px-4 hover:bg-gray-100"
                  onClick={()=> pickUser(u)}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    />
                    
                  </svg>
                  Edit
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}
