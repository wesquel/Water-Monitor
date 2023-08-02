package com.water_server.services;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import com.water_server.data.MonitorVO;
import com.water_server.exceptions.RequiredObjectIsNullException;
import com.water_server.mapper.DozerMapper;
import com.water_server.model.Monitor;
import com.water_server.repository.MonitorRepository;

@Service
public class MonitorService {

    private Logger logger = Logger.getLogger(MonitorService.class.getName());

    @Autowired
    MonitorRepository monitorRepository;

    @Autowired
    PagedResourcesAssembler<MonitorVO> assembler;

    public PagedModel<EntityModel<MonitorVO>> findAll(Pageable pageable){
        logger.info("Buscando todos os dados!");

        var produtoPage = monitorRepository.findAll(pageable);
        var produtosVosPage = produtoPage.map(p -> DozerMapper.parseObject(p, MonitorVO.class));
        
        return assembler.toModel(produtosVosPage);
    }

    public MonitorVO create(MonitorVO monitorVO){
        
        if(monitorVO == null) throw new RequiredObjectIsNullException();

        var entity = DozerMapper.parseObject(monitorVO, Monitor.class);
        MonitorVO vo;

        Monitor newMonitor = monitorRepository.save(entity);
        vo = DozerMapper.parseObject(newMonitor, MonitorVO.class);

        return vo;
    }
    
}
