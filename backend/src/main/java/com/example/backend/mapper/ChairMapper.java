package com.example.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.backend.dto.chair.AddChairDTO;
import com.example.backend.model.Chair;

@Mapper(componentModel = "spring")
public interface ChairMapper {

    @Mapping(target = "chair_id", ignore = true)
    @Mapping(target = "ctg_id", ignore = true)
    @Mapping(target = "discount", ignore = true)
    @Mapping(target = "created_at", expression = "java(new java.sql.Timestamp(System.currentTimeMillis()))")
    @Mapping(target = "status", expression = "java(\"NEW\")")
    Chair toEntity(AddChairDTO chairDTO);

}
