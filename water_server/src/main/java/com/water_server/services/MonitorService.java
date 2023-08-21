package com.water_server.services;

import com.water_server.data.MonitorVO;
import com.water_server.exceptions.RequiredObjectIsNullException;
import com.water_server.mapper.DozerMapper;
import com.water_server.model.Monitor;
import com.water_server.repository.MonitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class MonitorService {

    private Logger logger = Logger.getLogger(MonitorService.class.getName());

    @Autowired
    MonitorRepository monitorRepository;

    @Autowired
    PagedResourcesAssembler<MonitorVO> assembler;

    public PagedModel<EntityModel<MonitorVO>> findAll(Pageable pageable){
        logger.info("Buscando todos os dados!");

        var monitorPage = monitorRepository.findAll(pageable);
        var monitorVosPage = monitorPage.map(p -> DozerMapper.parseObject(p, MonitorVO.class));
        
        return assembler.toModel(monitorVosPage);
    }

    public ResponseEntity<?> findByMACAddress(String MACAddress) {
        logger.info("Iniciando busca de monitor por endereço MAC: " + MACAddress);

        if (MACAddress == null || MACAddress.isEmpty()) {
            String errorMessage = "O endereço MAC não pode ser nulo ou vazio.";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        try {
            Monitor monitor = monitorRepository.findByMACAddress(MACAddress);

            if (monitor == null) {
                return ResponseEntity.notFound().build();
            }

            MonitorVO monitorVO = DozerMapper.parseObject(monitor, MonitorVO.class);

            return ResponseEntity.ok(monitorVO);
        } catch (Exception e) {
            String errorMessage = "Erro ao buscar o monitor.";

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    public MonitorVO create(MonitorVO monitorVO){
        
        if(monitorVO == null) throw new RequiredObjectIsNullException();

        var entity = DozerMapper.parseObject(monitorVO, Monitor.class);
        MonitorVO vo;

        Monitor newMonitor = monitorRepository.save(entity);
        vo = DozerMapper.parseObject(newMonitor, MonitorVO.class);

        return vo;
    }

    public ResponseEntity<?> update(MonitorVO monitorVO) {
        logger.info("Iniciando atualização de monitor!");

        if (monitorVO == null) {
            return ResponseEntity.badRequest().body("Requisição inválida!");
        }

        Monitor monitor = monitorRepository.findByMACAddress(monitorVO.getMACAddress());

        if (monitor == null) {
            String errorMessage = "O monitor com o endereço MAC fornecido não existe.";

            return ResponseEntity.badRequest().body(errorMessage);
        }

        try {
            monitor.setCondutividade(monitorVO.getCondutividade());
            monitor.setPh(monitorVO.getPh());
            monitor.setTemperatura(monitorVO.getTemperatura());
            monitor.setTurbidez(monitorVO.getTurbidez());

            Monitor updatedMonitor = monitorRepository.save(monitor);
            MonitorVO resultMonitorVO = DozerMapper.parseObject(updatedMonitor, MonitorVO.class);

            return ResponseEntity.ok().body(resultMonitorVO);
        } catch (Exception e) {
            String errorMessage = "Erro ao atualizar dados do monitor.";

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }
}
