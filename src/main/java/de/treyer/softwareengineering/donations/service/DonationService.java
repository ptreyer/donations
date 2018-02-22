package de.treyer.softwareengineering.donations.service;

import de.treyer.softwareengineering.donations.DonationsApplication;
import de.treyer.softwareengineering.donations.dao.DonationDAO;
import de.treyer.softwareengineering.donations.model.DonationDO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
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

    public List<DonationDO> findAllLimited(int limit, boolean reset) {
        if(reset){
            DonationsApplication.index = 0;
        }

        List<DonationDO> donations = donationDAO.findAll();
        if (CollectionUtils.isEmpty(donations))
            return null;
        Collections.sort(donations, Comparator.comparing(DonationDO::getCreatedAt));

        int oldIndex = DonationsApplication.index;
        int newIndex = DonationsApplication.index + limit;

        if (donations.size() >= limit){
            if(donations.size() < newIndex){
                List<DonationDO> res = donations.subList(oldIndex, donations.size());
                DonationsApplication.index = 0;
                return res;
            }
            if(donations.size() > newIndex){
                DonationsApplication.index = newIndex;
                return donations.subList(oldIndex, newIndex);
            }
            if(donations.size() == newIndex){
                DonationsApplication.index = 0;
                return donations;
            }
        }
        DonationsApplication.index = 0;
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
        result.setName(donation.getName());

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
