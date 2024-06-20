import { useQuery } from "@tanstack/react-query";
import MUIDataTable from "mui-datatables";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Modal from "../../../Pages/Shared/Modal/Modal";
import { toast } from "react-toastify";

const ReportedActivities = () => {
  const axiosSecure = useAxiosSecure();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReports = async () => {
    const response = await axiosSecure.get("/reports");
    return response.data;
  };

  const {
    data: reports,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  const openModal = (report) => {
    setSelectedComment(report.comment);
    setSelectedReport(report);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleResolve = async (id) => {
    try {
      await axiosSecure.put(`/reports/${id}/resolve`);
      toast.success("Report marked as resolved");
      refetch();
    } catch (error) {
      toast.error("Error marking report as resolved");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/reports/${id}`);
      toast.success("Report deleted");
      refetch();
    } catch (error) {
      toast.error("Error deleting report");
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
      name: "reportedBy",
      label: "Reported By",
    },
    {
      name: "reason",
      label: "Reason",
    },
    {
      name: "comment",
      label: "Comment",
      options: {
        customBodyRender: (value, tableMeta) => {
          const report = reports[tableMeta.rowIndex];
          if (value.length > 20) {
            const truncatedText = value.substring(0, 20) + "...";
            return (
              <>
                <span>{truncatedText}</span>{" "}
                <button
                  className="read-more text-blue-400 hover:text-blue-700"
                  onClick={() => openModal(report)}
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
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const report = reports[tableMeta.rowIndex];
          return (
            <>
              <button
                className="px-2 py-1 mr-2 text-white bg-green-500 rounded hover:bg-green-700"
                onClick={() => handleResolve(report._id)}
                disabled={report.resolved}
              >
                {report.resolved ? "Resolved" : "Resolve"}
              </button>
              <button
                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                onClick={() => handleDelete(report._id)}
              >
                Delete
              </button>
            </>
          );
        },
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    selectableRows: "none",
    download: false,
    print: false,
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <MUIDataTable data={reports} columns={columns} options={options} />
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2>Report Details</h2>
        <p>
          <strong>Reported By:</strong> {selectedReport?.reportedBy}
        </p>
        <p>
          <strong>Reason:</strong> {selectedReport?.reason}
        </p>
        <p>
          <strong>Comment:</strong> {selectedComment}
        </p>
      </Modal>
    </>
  );
};

export default ReportedActivities;
