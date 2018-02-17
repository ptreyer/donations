package de.treyer.softwareengineering.donations.dao;

import de.treyer.softwareengineering.donations.model.DonationDO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationDAO extends JpaRepository<DonationDO, Integer> {

}
