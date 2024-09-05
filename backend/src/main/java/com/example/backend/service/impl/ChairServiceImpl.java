package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.dto.chair.ChairDTO;
import com.example.backend.dto.chair.ChairInfoDTO;
import com.example.backend.exception.CategoryNameNotFoundException;
import com.example.backend.exception.FailedAddingChairException;
import com.example.backend.exception.FileConvertingException;
import com.example.backend.exception.ImageFieldNullException;
import com.example.backend.exception.UploadFileException;
import com.example.backend.mapper.ChairMapper;
import com.example.backend.model.Chair;
import com.example.backend.model.Image;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ChairRepository;
import com.example.backend.repository.ImageRepository;
import com.example.backend.service.ChairService;

import com.example.backend.service.StorageService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChairServiceImpl implements ChairService {

    private final ChairRepository chairRepository;
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;
    private final ImageRepository imageRepository;

    private final ChairMapper chairMapper;

    @Override
    public void addChair(AddChairDTO newChair) throws FailedAddingChairException {

        try {
            Chair chair = chairMapper.toEntity(newChair);

            // Get the category ID correspanding to the current category name
            Long ctgID = categoryRepository.findCategoryByName(newChair.getCategory());
            if (ctgID == null) {
                throw new CategoryNameNotFoundException(newChair.getCategory() + "Catgeory Not found");
            }

            // verify if images field is null
            if (newChair.getImages() == null) {
                throw new ImageFieldNullException("Image field is null");
            }

            // push each image to amazon s3 and get the image_url
            for (MultipartFile image : newChair.getImages()) {
                String fileUrl = storageService.uploadFile(image);
                Image img = new Image();
                img.setName(newChair.getName());
                img.setImage_url(fileUrl);
                imageRepository.save(img);
            }

            chair.setCtg_id(ctgID);

            chairRepository.save(chair);
        } catch (UploadFileException | FileConvertingException | CategoryNameNotFoundException
                | ImageFieldNullException e) {
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
    public List<ChairDTO> getAllChairs(int offset, int size) {
        return chairMapper.toDto(chairRepository.getAllChairs(offset, size));
    }

    @Override
    public List<ChairDTO> recentlyAdded() {
        return chairMapper.toDto(chairRepository.getRecentChairs());
    }

    @Override
    public ChairInfoDTO getChair(String name) {
        return chairMapper.toChairInfoDTO(chairRepository.getChairInfo(name));
    }

    @Override
    public List<ChairDTO> getChairsByCategory(String category) {
        return chairMapper.toDto(chairRepository.filterChairsByCategory(category));
    }

}
