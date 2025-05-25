import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SearchAndFilter from "../components/common/SearchAndFilter";
import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";

const Clubs = () => {
   const [clubs, setClubs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedSportType, setSelectedSportType] = useState("");
   const [selectedLocation, setSelectedLocation] = useState("");

   useEffect(() => {
      const mockClubs = [
         {
            id: 1,
            name: "Mumbai Tigers Cricket Club",
            description: "A premier cricket club in Mumbai with state-of-the-art facilities.",
            logo: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            sportType: "Cricket",
            location: "Mumbai, Maharashtra",
            members: 120,
            established: 2010,
         },
         {
            id: 2,
            name: "Delhi Warriors Basketball",
            description: "Professional basketball club with training programs for all ages.",
            logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            sportType: "Basketball",
            location: "Delhi",
            members: 85,
            established: 2015,
         },
         {
            id: 3,
            name: "Chennai Tennis Academy",
            description: "Leading tennis academy offering world-class coaching and facilities.",
            logo: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            sportType: "Tennis",
            location: "Chennai, Tamil Nadu",
            members: 150,
            established: 2008,
         },
         {
            id: 4,
            name: "Bangalore Football League",
            description: "Top football club with youth development programs and senior teams.",
            logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            sportType: "Football",
            location: "Bangalore, Karnataka",
            members: 200,
            established: 2012,
         },
      ];

      setTimeout(() => {
         setClubs(mockClubs);
         setLoading(false);
      }, 1000);
   }, []);

   const filteredClubs = clubs.filter((club) => {
      return (
         (selectedSportType === "" || club.sportType === selectedSportType) &&
         (selectedLocation === "" || club.location.includes(selectedLocation)) &&
         (searchTerm === "" ||
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
   });

   const filters = [
      {
         key: "sportType",
         label: "Sport Type",
         value: selectedSportType,
         onChange: setSelectedSportType,
         options: [
            { value: "Cricket", label: "Cricket" },
            { value: "Basketball", label: "Basketball" },
            { value: "Tennis", label: "Tennis" },
            { value: "Football", label: "Football" },
         ],
      },
      {
         key: "location",
         label: "Location",
         value: selectedLocation,
         onChange: setSelectedLocation,
         options: [
            { value: "Mumbai", label: "Mumbai" },
            { value: "Delhi", label: "Delhi" },
            { value: "Chennai", label: "Chennai" },
            { value: "Bangalore", label: "Bangalore" },
         ],
      },
   ];

   if (loading) {
      return <LoadingSpinner text="Loading clubs..." />;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <PageHeader title="Sports Clubs" subtitle="Discover and join amazing sports clubs in your area" icon="🏆" />

         <SearchAndFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} filters={filters} />

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClubs.map((club) => (
               <Card
                  key={club.id}
                  image={club.logo}
                  title={club.name}
                  description={club.description}
                  badge={{
                     text: club.sportType,
                     className: "bg-blue-100 text-blue-800",
                  }}
                  details={[
                     { label: "Location", value: club.location },
                     { label: "Members", value: club.members },
                     { label: "Established", value: club.established },
                  ]}
                  actionButton={{
                     type: "link",
                     to: `/clubs/${club.id}`,
                     text: "View Club",
                     className: "bg-blue-600 text-white hover:bg-blue-700",
                  }}
               />
            ))}
         </div>

         {filteredClubs.length === 0 && (
            <p className="text-center text-gray-500 my-10">No clubs found matching your filters.</p>
         )}
      </div>
   );
};

export default Clubs;
