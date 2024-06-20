import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Modal from "../Shared/Modal/Modal";

const PostComment = () => {
  const loaderData = useLoaderData();
  const axiosSecure = useAxiosSecure(); // Use the useAxiosSecure hook to get the configured Axios instance
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [feedback, setFeedback] = useState({});
  const [reported, setReported] = useState({});

  const openModal = (comment) => {
    setSelectedComment(comment);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFeedbackChange = (reportId, value) => {
    setFeedback((prev) => ({ ...prev, [reportId]: value }));
    setReported((prev) => ({ ...prev, [reportId]: false }));
  };

  const handleReportClick = async (reportId, comment) => {
    const selectedFeedback = feedback[reportId];
    if (!selectedFeedback) {
      toast.error("Please select a feedback reason before reporting.");
      return;
    }

    setReported((prev) => ({ ...prev, [reportId]: true }));
    try {
      await axiosSecure.post("/reports", {
        comment,
        reason: selectedFeedback,
      });
      toast.success("Comment Reported");
    } catch (error) {
      console.error("Error reporting comment:", error);
      toast.error("Error submitting report");
    }
  };

  const columns = [
    {
      name: "_id",
      label: "Id",
      options: {
        display: false,
        filter: false,
      },
    },
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
    {
      name: "feedback",
      label: "Feedback",
      options: {
        customBodyRender: (value, tableMeta) => {
          const reportId = tableMeta.rowData[0];
          return (
            <select
              value={feedback[reportId] || ""}
              onChange={(e) => handleFeedbackChange(reportId, e.target.value)}
              className="px-2 py-1 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200"
              disabled={reported[reportId]}
            >
              <option value="" disabled>
                Select Feedback
              </option>
              <option value="spam">Spam</option>
              <option value="inappropriate">Inappropriate</option>
              <option value="other">Other</option>
            </select>
          );
        },
        filter: false,
      },
    },
    {
      name: "report",
      label: "Report",
      options: {
        customBodyRender: (value, tableMeta) => {
          const reportId = tableMeta.rowData[0];
          const comment = tableMeta.rowData[3];
          const isReported = reported[reportId];
          const isFeedbackSelected = !!feedback[reportId];
          return (
            <button
              onClick={() => handleReportClick(reportId, comment)}
              className={`px-4 py-2 text-white rounded-md ${
                isReported
                  ? "bg-gray-400 cursor-not-allowed"
                  : isFeedbackSelected
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFeedbackSelected || isReported}
            >
              {isReported ? "Reported" : "Report"}
            </button>
          );
        },
        filter: false,
      },
    },
  ];

  const options = {
    selectableRows: "none",
    download: false,
    print: false,
  };

  return (
    <>
      <MUIDataTable data={loaderData} columns={columns} options={options} />
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {selectedComment}
      </Modal>
    </>
  );
};

export default PostComment;
