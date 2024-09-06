package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.dto.chair.ChairDTO;
import com.example.backend.dto.chair.ChairInfoDTO;
import com.example.backend.exception.FailedAddingChairException;

public interface ChairService {

    void addChair(AddChairDTO newChair) throws FailedAddingChairException;

    void updateChair(Long chairID, AddChairDTO newChair);

    void deleteChair(int chairID);

    List<ChairDTO> getAllChairs(int offset, int size);

    List<ChairDTO> recentlyAdded();

    List<ChairDTO> getChairsByCategory(String category);

    ChairInfoDTO getChair(String name);

    List<String> getCategoriesName();

    Long nbOfChairs();

}
