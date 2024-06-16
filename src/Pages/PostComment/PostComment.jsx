import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import LoadingSkeleton from "../Shared/LoadingSkeleton/LoadingSkeleton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MUIDataTable from "mui-datatables";
import Modal from "../Shared/Modal/Modal";

const PostComment = () => {
  const loaderData = useLoaderData();
  const postId = loaderData[0]?.postId;

  const { data: comments, isLoading, isError } = useQuery({
    queryFn: fetchMyComments,
    queryKey: "myComments",
  });

  async function fetchMyComments() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching featured comments");
    }
  }

  // State to manage modal visibility and comment content
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");

  const openModal = (comment) => {
    setSelectedComment(comment);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const columns = [
    {
      name: "commenterName",
      label: "Name",
    },
    {
      name: "commenterEmail",
      label: "Email",
    },
    {
      name: "comment",
      label: "Comment",
      options: {
        customBodyRender: (value) => {
          if (value.length > 20) {
            const truncatedText = value.substring(0, 20) + "...";
            return (
              <>
                <span>{truncatedText}</span>{" "}
                <button
                  className="read-more text-blue-400 hover:text-blue-700"
                  onClick={() => openModal(value)}
                >
                  Read More
                </button>
              </>
            );
          } else {
            return value;
          }
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    download: false,
    print: false,
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      {isError && <p>Error fetching comments.</p>}
      <MUIDataTable data={comments} columns={columns} options={options} />
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {selectedComment}
      </Modal>
    </>
  );
};

export default PostComment;
