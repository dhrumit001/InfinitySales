using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InfinitySales.Migrations
{
    public partial class TenantReferenceOnTenantDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                 name: "IX_TenantDetails_TenantId",
                 table: "TenantDetails",
                 column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_TenantDetails_AbpTenants_TenantId",
                table: "TenantDetails",
                column: "TenantId",
                principalTable: "AbpTenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TenantDetails_AbpTenants_TenantId",
                table: "TenantDetails");

            migrationBuilder.DropIndex(
                name: "IX_TenantDetails_TenantId",
                table: "TenantDetails");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "TenantDetails");
        }
    }
}
