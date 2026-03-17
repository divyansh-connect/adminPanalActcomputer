import React from "react";
import AddAnnouncement from "./AddAnnouncement";
import ShowAnnouncement from "./ShowAnnouncement";
import { useState } from "react";
import AnnouncementsSkeleton from "../Skeleton/AnnouncementsSkeleton";

const Announcements = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <h3 className="mb-3">Manage Announcements</h3>
      <div className="row ">
        <div className="col-12">
          <AddAnnouncement setRefresh={setRefresh} />
        </div>
        <div className="col-12 ">
          {loading && <AnnouncementsSkeleton />}

          <ShowAnnouncement
            setLoading={setLoading}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </div>
      </div>
    </>
  );
};

export default Announcements;
