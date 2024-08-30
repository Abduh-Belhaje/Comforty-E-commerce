package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.exception.CategoryNameNotFoundException;
import com.example.backend.exception.FailedAddingChairException;
import com.example.backend.exception.FileConvertingException;
import com.example.backend.exception.UploadFileException;
import com.example.backend.mapper.ChairMapper;
import com.example.backend.model.Chair;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ChairRepository;
import com.example.backend.service.ChairService;

import com.example.backend.service.StorageService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChairServiceImpl implements ChairService {

    private final ChairRepository chairRepository;
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;

    private final ChairMapper chairMapper;

    @Override
    public void addChair(AddChairDTO newChair) throws FailedAddingChairException {

        try {
            Chair chair = chairMapper.toEntity(newChair);

            // Get the category ID correspanding to the current Category name
            Long ctgID = categoryRepository.findCategoryByName(newChair.getCategoty());
            if (ctgID == null) {
                throw new CategoryNameNotFoundException(newChair.getCategoty() + "Catgeory Not found");
            }

            // push the image to amazon s3 and get the image_url
            for (MultipartFile image : newChair.getImages()) {
                String fileUrl = storageService.uploadFile(image);
            }

            chair.setCtg_id(ctgID);

            chairRepository.save(chair);
        } catch (UploadFileException | FileConvertingException | CategoryNameNotFoundException e) {
            throw new FailedAddingChairException("Adding Chair operation failed : " +
                    e.getMessage());
        }
    }

    @Override
    public void updateChair(Long chairID, AddChairDTO newChair) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateChair'");
    }

    @Override
    public void deleteChair(int chairID) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteChair'");
    }

    @Override
    public List<Chair> getAllChairs() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllChairs'");
    }

    @Override
    public List<Chair> recentlyAdded() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'recentlyAdded'");
    }

    @Override
    public Chair getChair(Long chairID) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getChair'");
    }

}
