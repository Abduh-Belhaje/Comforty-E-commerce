package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.exception.FailedAddingChairException;
import com.example.backend.model.Chair;

public interface ChairService {

    void addChair(AddChairDTO newChair) throws FailedAddingChairException;

    void updateChair(Long chairID, AddChairDTO newChair);

    void deleteChair(int chairID);

    List<Chair> getAllChairs();

    List<Chair> recentlyAdded();

    Chair getChair(Long chairID);

}
