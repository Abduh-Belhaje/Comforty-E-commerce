package com.example.backend.mapper;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.model.Chair;

public class ChairMapperTest {

    private ChairMapper chairMapper = Mappers.getMapper(ChairMapper.class);

    @Test
    void mapFromChairDtoToChair() {

        AddChairDTO chairDTO = new AddChairDTO("xx", "xx", null, "ooo", "red", 10, 10);

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
}
