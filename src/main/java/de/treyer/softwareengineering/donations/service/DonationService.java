package de.treyer.softwareengineering.donations.service;

import de.treyer.softwareengineering.donations.dao.DonationDAO;
import de.treyer.softwareengineering.donations.model.DonationDO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class DonationService {

    private static Logger log = LoggerFactory.getLogger(DonationService.class);

    @Autowired
    private DonationDAO donationDAO;

    public List<DonationDO> findAll() {
        return donationDAO.findAll();
    }

    public List<DonationDO> findAllLimited(int limit) {
        List<DonationDO> donations = donationDAO.findAll();
        if (CollectionUtils.isEmpty(donations))
            return null;

        Collections.sort(donations, Comparator.comparing(DonationDO::getCreatedAt).reversed());


        if (donations.size() >= limit)
            return donations.subList(0, limit);

        return donations;
    }

    public Double getDonationValue() {
        List<DonationDO> donations = donationDAO.findAll();
        if (CollectionUtils.isEmpty(donations)) {
            return 0.00;
        }
        Double betrag = 0.00;
        for (DonationDO donationDO : donations) {
            betrag += donationDO.getBetrag();
        }
        return betrag;
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

        return donationDAO.save(result);
    }

    public void delete(Integer id) throws Exception {
        DonationDO result = donationDAO.findOne(id);
        if (result == null) {
            throw new Exception("Kein Ergebnis gefunden");
        }
        donationDAO.delete(result);
    }

    public DonationDO save(DonationDO donation) {
        return donationDAO.save(donation);
    }


}
