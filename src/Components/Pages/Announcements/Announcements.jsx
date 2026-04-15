import React, { useEffect } from "react";
import AddAnnouncement from "./AddAnnouncement";
import ShowAnnouncement from "./ShowAnnouncement";
import { useState } from "react";
import AnnouncementsSkeleton from "../Skeleton/AnnouncementsSkeleton";
import { getinstituteAnnouncement } from "../../../Services/InstitudeServices";

const Announcements = () => {
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState("");
  const [announcementList, setAnnouncementList] = useState([]);

  useEffect(() => {
    const listsCall = async () => {
      setLoading(true);
      try {
        const response = await getinstituteAnnouncement();
        if (!response.success) {
          return setFetch(error.message || "Announcement find failed");
        }
        setAnnouncementList(response.data);
      } catch (error) {
        if (error.message === "Unauthorized") return;
        return setFetch(error.message || "Server error");
      } finally {
        setLoading(false);
      }
    };
    listsCall();
  }, []);

  return (
    <>
      <div className="p-2">
        <div className="row ">
          <div className="col-12">
            <AddAnnouncement setAnnouncementList={setAnnouncementList} />
          </div>
          <div className="col-12 ">
            {loading ? (
              <AnnouncementsSkeleton />
            ) : (
              <ShowAnnouncement
                announcementList={announcementList}
                setAnnouncementList={setAnnouncementList}
                fetch={fetch}
                setFetch={setFetch}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
