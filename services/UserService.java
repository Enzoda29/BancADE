package it.postel.bancarizzazioneGUI.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import it.citel.postel.bancarizzazioneGUI.dao.UserDao;

@Service
public class UserService implements UserDetailsService{

	@Autowired
    private UserDao userDao;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userDao.loadUserByUsername(username);
	}
	
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

}
