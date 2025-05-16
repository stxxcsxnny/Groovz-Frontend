import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useErrors from '../../../hooks/hook';
import AdminLayout from '../../components/layout/AdminLayout';
import { LayoutLoader } from '../../components/layout/Loaders';
import Table from '../../components/shared/Table';
import { transformImage } from '../../lib/Features';
import { useGetUsersQuery } from '../../redux/api/api';

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (<Avatar alt={params.row.name} src={params.row.avatar} />)
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "friend",
    headerName: "Friend",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "group",
    headerName: "Group",
    headerClassName: "table-header",
    width: 200
  }
];

const UserManagement = () => {



  const { data, error, isLoading } = useGetUsersQuery()


  const [rows, setRows] = useState([])


  const { users } = data || {}


  useErrors([{
    error: error

  }])

  useEffect(() => {
    if (users) {
      setRows(
        users.map((user) => ({

          id: user._id,
          name: user.name,
          username: user.username,
          friend: user.friends,
          group: user.groups,
          avatar: transformImage(user.avatar, 50)
        }))
      )

    }
  }, [users])






  return isLoading ? (<LayoutLoader />) : (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows} />

    </AdminLayout>
  );
}

export default UserManagement;
