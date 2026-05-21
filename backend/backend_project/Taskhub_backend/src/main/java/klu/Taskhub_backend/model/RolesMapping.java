package klu.Taskhub_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class RolesMapping {
	
	@Id
	Long role;
	
	@Id
	Long mid;

	public Long getRole() {
		return role;
	}

	public void setRole(Long role) {
		this.role = role;
	}

	public Long getMid() {
		return mid;
	}

	public void setMid(Long mid) {
		this.mid = mid;
	}
	
	

}
