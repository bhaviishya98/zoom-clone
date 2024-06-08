"use client";
import React, { useState, useEffect } from "react";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";

const Home = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [nextMeetingTime, setNextMeetingTime] = useState("");
  const { upcomingCalls, isLoading } = useGetCalls();

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const newTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
      }).format(now);

      setTime(newTime);
      setDate(newDate);
    };

    updateTimeAndDate(); // Initial call to set time and date immediately
    const intervalId = setInterval(updateTimeAndDate, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (upcomingCalls && upcomingCalls.length > 0) {
      const nextMeeting = upcomingCalls[0];
      const meetingTime = nextMeeting.state.startsAt
        ? new Date(nextMeeting.state.startsAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "No Upcoming Meetings";
      setNextMeetingTime(meetingTime);
    } else {
      setNextMeetingTime("No Upcoming Meetings");
    }
  }, [upcomingCalls]);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between p-4 max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            {nextMeetingTime === "No Upcoming Meetings"
              ? nextMeetingTime
              : `Upcoming Meeting at: ${nextMeetingTime}`}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
