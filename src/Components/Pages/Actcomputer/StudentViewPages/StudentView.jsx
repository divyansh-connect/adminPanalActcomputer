import React, { useEffect, useState } from "react";
import StudentHeader from "./StudentHeader";
import StudentFeeSummary from "./StudentFeeSummary";
import StudentDetails from "./StudentDetails";
import StudentPayemtHst from "./StudentPayemtHst";
import StudentPayFee from "../StudentPayFee";
import { studentData } from "../../../../DemoData/LibarySeat";
import StdCompleted from "../../Modal/ActComputer/StdCompleted";
import { useParams } from "react-router-dom";
import NotFounded from "../../Error/NotFounded";
import {
  getAppPayments,
  getInsituteStudent,
} from "../../../../Services/InstitudeServices";
import StdUploadDocModal from "../../Modal/ActComputer/StdUploadDocModal";

const StudentView = () => {
  const { stdId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [err, setErr] = useState("");
  const [payFee, setPayFee] = useState(false);
  const [complete, setComplete] = useState(false);
  const [upload, setUpload] = useState(false);
  const [student, setStudent] = useState({});
  const [stdPayments, setStdPayments] = useState([]);

  useEffect(() => {
    getInsituteStudent(stdId)
      .then((res) => {
        if (!res.success) {
          setErr(res.message);
        }
        setIsLoading(false);
        setStudent(res.data);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") return;
        setErr("Something went wrong");
      });

    getAppPayments(stdId)
      .then((res) => {
        if (!res.success) {
        }
        setStdPayments(res.data);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") return;
      });
  }, [refresh]);

  if (err) return <NotFounded err={err} />;
  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {payFee && (
            <StudentPayFee
              student={student}
              setPayFee={setPayFee}
              setRefresh={setRefresh}
              stdPayments={stdPayments}
            />
          )}
          {complete && (
            <StdCompleted student={student} setComplete={setComplete} />
          )}
          {upload && (
            <StdUploadDocModal setUpload={setUpload} student={student} />
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
          <StudentPayemtHst stdPayments={stdPayments} />
        </>
      )}
    </>
  );
};

export default StudentView;
