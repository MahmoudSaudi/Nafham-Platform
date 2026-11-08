import { MOCK_INSTRUCTOR_PROFILE } from '../data/mockInstructor';
import InstructorProfileHeader from './InstructorProfileHeader';
import InstructorStats from './InstructorStats';
import InstructorCourses from './InstructorCourses';
import InstructorReviews from './InstructorReviews';

export default function InstructorProfile() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]" dir="rtl">
      
      {/* Profile Header */}
      <InstructorProfileHeader instructor={MOCK_INSTRUCTOR_PROFILE} />
      
      {/* Stats */}
      <InstructorStats stats={MOCK_INSTRUCTOR_PROFILE.stats} />
      
      {/* Courses */}
      <InstructorCourses 
        instructorName={MOCK_INSTRUCTOR_PROFILE.name} 
        courses={MOCK_INSTRUCTOR_PROFILE.courses} 
      />
      
      {/* Student Reviews */}
      <InstructorReviews reviews={MOCK_INSTRUCTOR_PROFILE.reviews} />
      
    </div>
  );
}
