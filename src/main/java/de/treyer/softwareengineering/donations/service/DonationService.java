package de.treyer.softwareengineering.donations.service;

import de.treyer.softwareengineering.donations.dao.DonationDAO;
import de.treyer.softwareengineering.donations.model.DonationDO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationService {

    private static Logger log = LoggerFactory.getLogger(DonationService.class);

    @Autowired
    private DonationDAO donationDAO;

    public List<DonationDO> findAll() {
        return donationDAO.findAll();
    }

    public DonationDO find(Integer id) {
        return donationDAO.findOne(id);
    }

    public DonationDO update(Integer id, DonationDO donation) throws Exception {
        DonationDO result = donationDAO.findOne(id);
        if (result == null) {
            throw new Exception("Kein Ergebnis gefunden");
        }
        result.setBetrag(donation.getBetrag());
        result.setNachname(donation.getNachname());
        result.setVorname(donation.getVorname());
        result.setFirma(donation.getFirma());

        return donationDAO.save(result);
    }

    public void delete(Integer id) throws Exception {
        DonationDO result = donationDAO.findOne(id);
        if (result == null) {
            throw new Exception("Kein Ergebnis gefunden");
        }
        donationDAO.delete(result);
    }

    public DonationDO save(DonationDO donation){
        return donationDAO.save(donation);
    }


}
