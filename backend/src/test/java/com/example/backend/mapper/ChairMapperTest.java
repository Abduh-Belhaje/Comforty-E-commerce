package com.example.backend.mapper;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.dto.chair.ChairDTO;
import com.example.backend.model.Chair;

public class ChairMapperTest {

    private ChairMapper chairMapper = Mappers.getMapper(ChairMapper.class);

    @Test
    void mapFromChairDtoToChair() {

        AddChairDTO chairDTO = new AddChairDTO("xx", "xx", null, "ooo", "red", "10", "10", "0", null, null);

        Chair chair = chairMapper.toEntity(chairDTO);

        assertNotNull(chair);
        assertThat(chair.getName()).isEqualTo(chairDTO.getName());
        assertThat(chair.getDescription()).isEqualTo(chairDTO.getDescription());
        assertThat(chair.getColor()).isEqualTo(chairDTO.getColor());
        assertThat(chair.getWeight()).isEqualTo(chairDTO.getWeight());
        assertThat(chair.getWeight()).isEqualTo(chairDTO.getWeight());
        assertThat(chair.getStatus()).isEqualTo("NEW");
        assertNotNull(chair.getCreated_at());
    }

    @Test
    void mapFromObjectsToChairDTO() {
        // Given: A list of Object[] representing rows from the database
        Object[] obj1 = { "Chair1", "A comfortable chair", "NEW", "img1_1.url", 1000 };
        Object[] obj2 = { "Chair2", "A stylish chair", "NEW", "img2_1.url", 1000 };
        List<Object[]> data = Arrays.asList(obj1, obj2);

        // When: We map this list to a list of ChairDTOs
        List<ChairDTO> chairDTOs = chairMapper.toDto(data);

        // Then: The result should match the expected values
        assertThat(chairDTOs).isNotNull();
        assertThat(chairDTOs.size()).isEqualTo(2);

        ChairDTO chair1 = chairDTOs.get(0);
        assertThat(chair1.getName()).isEqualTo("Chair1");
        assertThat(chair1.getImage_url()).isEqualTo("img1_1.url");
        assertThat(chair1.getDescription()).isEqualTo("A comfortable chair");
        assertThat(chair1.getStatus()).isEqualTo("NEW");
        assertThat(chair1.getPrice()).isEqualTo(1000);

        ChairDTO chair2 = chairDTOs.get(1);
        assertThat(chair2.getName()).isEqualTo("Chair2");
        assertThat(chair2.getImage_url()).isEqualTo("img2_1.url");
        assertThat(chair2.getDescription()).isEqualTo("A stylish chair");
        assertThat(chair1.getStatus()).isEqualTo("NEW");
        assertThat(chair1.getPrice()).isEqualTo(1000);
    }

}
