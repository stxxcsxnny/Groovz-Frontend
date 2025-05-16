import { Avatar, Box, Stack } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import RenderComponent from '../../components/shared/RenderComponent';
import Table from '../../components/shared/Table';
import { fileFormat, transformImage } from '../../lib/Features';
import { useGetMessagesQuery } from '../../redux/api/api';

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments.length > 0 ? attachments.map((i, index) => {
        const url = i.url;
        const file = fileFormat(url);
        return (
          <Box key={index}>
            <a href={url}
              download
              target='_blank'
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              {<RenderComponent file={file} url={url} />}
            </a>
          </Box>
        );
      }) : "No attachments";
    }
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400
  },
  {
    field: "sender",
    headerName: "Sent by",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center">
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    )
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220
  },
  {
    field: "groupChat",
    headerName: "Group chat",
    headerClassName: "table-header",
    width: 100
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250
  }
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  const { data, error, isLoading, } = useGetMessagesQuery()

  console.log(data)

  useEffect(() => {
    setRows(data?.messages?.map(i => ({
      ...i,
      id: i._id,
      sender: {
        name: i.sender.name,
        avatar: transformImage(i.sender.avatar, 50)
      },
      createdAt: moment(i.createdAt).format('DD/MM/YYYY HH:mm:ss')
    })));
  }, [data]);

  return (
    <AdminLayout>
      <Table heading={'Message Management'} columns={columns} rows={rows} rowHeight={200} />
    </AdminLayout>
  );
}

export default MessageManagement;

