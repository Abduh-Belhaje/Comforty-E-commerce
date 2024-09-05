package com.example.backend.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.dto.chair.ChairDTO;
import com.example.backend.dto.chair.ChairInfoDTO;
import com.example.backend.model.Chair;

@Mapper(componentModel = "spring")
public interface ChairMapper {

    @Mapping(target = "chair_id", ignore = true)
    @Mapping(target = "ctg_id", ignore = true)
    @Mapping(target = "created_at", expression = "java(new java.sql.Timestamp(System.currentTimeMillis()))")
    @Mapping(target = "status", expression = "java(\"NEW\")")
    Chair toEntity(AddChairDTO chairDTO);

    // Custom method to map from Object[] to ChairDTO
    default ChairInfoDTO toChairInfoDTO(List<Object[]> obj) {
        if (obj == null || obj.isEmpty()) {
            return null; // or throw an exception if appropriate
        }

        // Extract the main chair info from the first element
        Object[] firstObj = obj.get(0);
        String name = (String) firstObj[0];
        String description = (String) firstObj[1];
        String status = (String) firstObj[2];
        String color = (String) firstObj[3];
        String height = (String) firstObj[4];
        String weight = (String) firstObj[5];
        String discount = (String) firstObj[6];

        List<String> images = new ArrayList<>();

        for (Object[] object : obj) {
            images.add((String) object[7]);
        }

        return new ChairInfoDTO(name, description, status, color, height, weight, discount, images);
    }

    // Method to map a list of Object[] to a list of ChairDTOs
    default List<ChairDTO> toDto(List<Object[]> objs) {
        return objs.stream().map(this::mapObjectArrayToChairDTO).collect(Collectors.toList());
    }

    // Helper method to map a single Object[] to ChairDTO
    default ChairDTO mapObjectArrayToChairDTO(Object[] obj) {
        return new ChairDTO(
                (String) obj[0], // name
                (String) obj[1], // description
                (String) obj[2], // status
                (String) obj[3], // color
                (String) obj[4], // height
                (String) obj[5], // weight
                (String) obj[6], // discount
                (String) obj[7] // image_url
        );
    }
}
