    package com.example.backendlol.backend.service;

    import com.example.backendlol.backend.model.TimeOffRequest;
    import com.example.backendlol.backend.repository.TimeOffRequestRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class TimeOffRequestService {

        @Autowired
        private TimeOffRequestRepository timeOffRequestRepository;

        public List<TimeOffRequest> getTimeOffRequestsByTeamLeadId(Long teamLeadId) {
            return timeOffRequestRepository.findByTeamLeadId(teamLeadId);
        }

        public TimeOffRequest saveTimeOffRequest(TimeOffRequest request) {
            return timeOffRequestRepository.save(request);
        }

        public TimeOffRequest updateTimeOffRequest(Long id, TimeOffRequest request) {
            if (timeOffRequestRepository.existsById(id)) {
                request.setId(id);
                return timeOffRequestRepository.save(request);
            }
            return null;
        }
        public List<TimeOffRequest> getAllTimeOffRequests() {
            return timeOffRequestRepository.findAll();
        }
        

        public void deleteTimeOffRequest(Long id) {
            timeOffRequestRepository.deleteById(id);
        }
    }
