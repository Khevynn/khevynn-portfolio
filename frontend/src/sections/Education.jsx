import InfoBox from "../components/layouts/EducationBox";
import ProgrammingCourseImage from "../assets/programming-course.png";
import IadePhoto from "../assets/iade-photo.png";

function Education() {
  return (
    <section className="relative flex flex-col py-24 w-full max-w-7xl mx-auto px-6 overflow-hidden border-t border-white/5">
      <div className="mb-16">
        <h2 className="text-sm font-inter text-emerald-400 tracking-[0.2em] uppercase mb-3 font-semibold">Academic Background</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold font-outfit text-white">
          Education
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 w-full z-10">
        <InfoBox
          title="Bachelor in Games Development"
          provider="IADE - European University"
          location="Lisbon, Portugal"
          period="2022 – 2025"
          description="Higher education course focused on the creation and programming of video games, covering design, artificial intelligence, 3D modeling, animation and interactive software development. Includes practical projects and teamwork, preparing students to work in the video game industry."
          image={IadePhoto}
        />

        <InfoBox
          title="Professional Course – Computer Programmer"
          provider="AGMRA"
          location="Cascais, Portugal"
          period="2019 – 2022"
          description="Dual-certified course focused on software development, covering programming logic, database management, and practical training in Java, C#, and Python. Projects included desktop and web app development, as well as hands-on work with MySQL for modeling and SQL queries. Included a real-world internship (FCT) to consolidate technical skills."
          image={ProgrammingCourseImage}
        />
      </div>
    </section>
  );
}

export default Education;
