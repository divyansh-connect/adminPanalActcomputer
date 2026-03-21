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

const StudentView = () => {
  const { stdId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const [payFee, setPayFee] = useState(false);
  const [complete, setComplete] = useState(false);
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
  }, []);

  if (err) return <NotFounded err={err} />;
  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {payFee && <StudentPayFee student={student} setPayFee={setPayFee} />}
          {complete && (
            <StdCompleted student={student} setComplete={setComplete} />
          )}
          <StudentHeader
            student={student}
            setPayFee={setPayFee}
            setComplete={setComplete}
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
