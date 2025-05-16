import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useErrors from '../../../hooks/hook';
import AdminLayout from '../../components/layout/AdminLayout';
import AvatarCard from '../../components/shared/AvatarCard';
import Table from '../../components/shared/Table';
import { transformImage } from '../../lib/Features';
import { useGetChatsQuery } from '../../redux/api/api';

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
    renderCell: (params) => (<AvatarCard avatar={params.row.avatar} />)
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 220,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center">
        {params.row.members.map((avatar, index) => (
          <Avatar key={index} src={avatar} sx={{ width: 30, height: 30, marginLeft: index !== 0 ? '-10px' : 0, border: '2px solid #fff' }} />
        ))}
      </Stack>
    )
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={'1rem'}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  }
];

const ChatManagement = () => {
  const { data, error } = useGetChatsQuery();
  const [rows, setRows] = useState([]);

  console.log(data);

  console.log(data?.chats?.totalmembers)

  useErrors([{ error }]);

  useEffect(() => {
    if (data?.chats) {
      setRows(data.chats.map(chat => ({
        id: chat._id,
        name: chat.name,
        totalMembers: chat.totalmembers, // Fixed key
        totalMessages: chat.totalMessages, // Fixed key
        creator: chat.creator,
        avatar: transformImage(chat.avatar, 50), // Single avatar image
        members: chat.members.map(member => transformImage(member.avatar, 50)) // List of member avatars
      })));
    }
  }, [data]);

  return (
    <AdminLayout>
      <Table heading={'All Chats'} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
