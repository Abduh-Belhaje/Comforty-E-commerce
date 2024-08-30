package com.example.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.exception.FailedAddingChairException;
import com.example.backend.exception.FileConvertingException;
import com.example.backend.exception.UploadFileException;
import com.example.backend.mapper.ChairMapper;
import com.example.backend.model.Chair;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ChairRepository;
import com.example.backend.service.impl.ChairServiceImpl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ChairServiceTest {

        private ChairService chairService;

        @Mock
        private ChairRepository chairRepository;

        @Mock
        private StorageService storageService;

        @Mock
        private CategoryRepository categoryRepository;

        @Mock
        private ChairMapper chairMapper = Mappers.getMapper(ChairMapper.class);

        @BeforeEach
        public void setup() {
                chairService = new ChairServiceImpl(chairRepository, categoryRepository,
                                storageService, chairMapper);
        }

        @Test
        void shouldAddNewChair() throws UploadFileException, FileConvertingException, FailedAddingChairException {
                AddChairDTO chairDTO = new AddChairDTO("xx", "xx", null, "ooo", "red", "10",
                                "10");

                given(chairMapper.toEntity(chairDTO))
                                .willReturn(new Chair());

                given(categoryRepository.findCategoryByName(chairDTO.getCategoty()))
                                .willReturn(1L);

                // given(storageService.uploadFile(chairDTO.getImage()))
                // .willReturn("http://image_url");

                chairService.addChair(chairDTO);

                ArgumentCaptor<Chair> ChairArgumentCaptor = ArgumentCaptor.forClass(Chair.class);
                verify(chairRepository).save(ChairArgumentCaptor.capture());
                assertThat(ChairArgumentCaptor.getValue().getCtg_id()).isEqualTo(1L);
                // assertThat(ChairArgumentCaptor.getValue().getPicture_url()).isEqualTo("http://image_url");

        }
}
