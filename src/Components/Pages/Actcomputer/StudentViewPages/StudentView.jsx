import React, { useEffect, useState } from "react";
import StudentHeader from "./StudentHeader";
import StudentFeeSummary from "./StudentFeeSummary";
import StudentDetails from "./StudentDetails";
import StudentPayemtHst from "./StudentPayemtHst";
import StudentPayFee from "../StudentPayFee";
import StdCompleted from "../../Modal/ActComputer/StdCompleted";
import { useParams } from "react-router-dom";
import NotFounded from "../../Error/NotFounded";
import {
  getAllDocument,
  getAllPaymentsbyId,
  getInsituteStudent,
} from "../../../../Services/InstitudeServices";
import StdUploadDocModal from "../../Modal/ActComputer/StdUploadDocModal";
import StudentDocument from "./StudentDocument";
import StudentViewSkeleton from "../../Skeleton/StudentViewSkeleton";

const StudentView = () => {
  const { stdId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const [payFee, setPayFee] = useState(false);
  const [complete, setComplete] = useState(false);
  const [upload, setUpload] = useState(false);
  const [student, setStudent] = useState({});
  const [stdPayments, setStdPayments] = useState([]);
  const [stdDoc, setStdDoc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [std, pay, doc] = await Promise.all([
          getInsituteStudent(stdId),
          getAllPaymentsbyId(stdId),
          getAllDocument(stdId),
        ]);

        // Student handle
        if (!std.success) {
          setErr(std.message);
        } else {
          setStudent(std.data);
        }

        // Payment handle
        if (!pay.success) {
          setErr(pay.message);
        } else {
          setStdPayments(pay.data);
        }

        // Document handle
        if (!doc.success) {
          setErr(doc.message);
        } else {
          setStdDoc(doc.data);
        }
      } catch (error) {
        if (error.message === "Unauthorized") return;
        setErr("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (err) return <NotFounded err={err} />;
  return (
    <>
      {isLoading ? (
        <StudentViewSkeleton />
      ) : (
        <>
          {payFee && (
            <StudentPayFee
              student={student}
              setPayFee={setPayFee}
              setStdPayments={setStdPayments}
            />
          )}
          {upload && (
            <StdUploadDocModal
              setUpload={setUpload}
              student={student}
              setStdDoc={setStdDoc}
            />
          )}
          {complete && (
            <StdCompleted student={student} setComplete={setComplete} />
          )}

          <StudentHeader
            student={student}
            setPayFee={setPayFee}
            setComplete={setComplete}
            setUpload={setUpload}
          />
          <StudentFeeSummary
            stdCourse={student.courseId}
            stdPayments={stdPayments}
          />
          <StudentDetails student={student} />
          <StudentDocument documents={stdDoc} setStdDoc={setStdDoc} />
          <StudentPayemtHst stdPayments={stdPayments} />
        </>
      )}
    </>
  );
};

export default StudentView;
