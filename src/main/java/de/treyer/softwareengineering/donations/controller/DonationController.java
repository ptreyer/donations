package de.treyer.softwareengineering.donations.controller;

import de.treyer.softwareengineering.donations.model.DonationDO;
import de.treyer.softwareengineering.donations.service.DonationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/donation")
public class DonationController {

    private static Logger log = LoggerFactory.getLogger(DonationController.class);

    @Autowired
    private DonationService donationService;

    @GetMapping(value = "/")
    public List<DonationDO> findAll() {
        return donationService.findAll();
    }

    @GetMapping(value = "/all/{limit}/{reset}")
    public List<DonationDO> findAllLimited(@PathVariable(value = "limit") Integer limit, @PathVariable(value = "reset") boolean reset) {
        return donationService.findAllLimited(limit, reset);
    }

    @GetMapping(value = "/value")
    public Double getDonationValue() {
        return donationService.getDonationValue();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<DonationDO> add(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(donationService.find(id));
    }

    @PostMapping(value = "/")
    public DonationDO save(@Valid @RequestBody DonationDO donation) {
        return donationService.save(donation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonationDO> update(@PathVariable(value = "id") Integer id,
                                                 @Valid @RequestBody DonationDO donation) {
        try {
            return ResponseEntity.ok(donationService.update(id, donation));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DonationDO> delete(@PathVariable(value = "id") Integer id) {
        try {
            donationService.delete(id);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

}
