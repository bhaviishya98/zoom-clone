import CallList from "@/components/CallList";

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Previous Meeting</h1>

      <CallList type="ended" />
    </section>
  );
};

export default UpcomingPage;